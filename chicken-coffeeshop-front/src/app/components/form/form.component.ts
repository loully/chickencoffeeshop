import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {PlayerService} from "../../services/player.service";
import {Player} from "../../models/player";
import {StorageService} from "../../shared/service/storage.service";
import {Constants} from "../../shared/constants";
import {Location} from "@angular/common";
import {Chicken} from "../../models/chicken";
import {ChickenService} from "../../services/chicken.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {EMPTY} from "rxjs";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  pseudo!: string;
  form!:FormBuilder;
  chickenForm!: FormGroup;
  chickenUnitsArray!:FormArray;
  chickenUnitForm!: FormGroup;
  valid = false;
  submit = false;
  duplicates = [];
  duplicatedIndex!: number[][];
  isThereDuplication = false;
  player!: Player | null;
  furOptions = [
    {name: 'WHITEFUR', value: 'Blanche'},
    {name: 'REDFUR', value: 'Rousse'}
  ];
  finalChickens: Chicken[] = [];
  msgError!: string;
  isRegistred!: boolean;
  registredChicken!: Chicken[] | [];
  filteredFurValue!: { name:string, value:string } | null;
  //furInclude = this.furOptions.map(e=> e.value).includes(this.furValue?.value);

  constructor(
    private playerService: PlayerService,
    private chickenService: ChickenService,
    private formBuilder: FormBuilder,
    private storage: StorageService,
    private location: Location,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    this.playerService.getLocalRegistredPlayer().subscribe((player) => {
      this.pseudo = player?.pseudo!;
      this.player = player;
      this.isRegistred = player?.id !== 0;
      console.log("Player name registred: ", player?.pseudo);
    });
    // If chickens are registred, check masterId and get registred chicken in localStorage
    this.registredChicken = JSON.parse(<string>this.storage.storageGetItem(Constants.KEY_CHICKENS));
    console.log("Chicken actually registred: ",this.registredChicken);
    if(this.registredChicken!= null && this.registredChicken.length>0) {
      if(this.registredChicken.some(chicken => chicken.masterId !== this.player!.id)) {
        console.log("Chicken registred are NOT owned by the user");
        this.chickenService.getRegistredChickenPlayer(this.player!.id)
          .pipe(
            catchError (() => {
              console.log("Erreur lors du chargement des poules");
              this.registredChicken = [];
              return EMPTY;
            }))
          .subscribe(chickens => {
              console.log("Chickens registred from back -subscribe-",chickens);
              this.registredChicken = chickens;
              this.buildForm();
            }
          );
        console.log("Chicken registred after usr check: ",this.registredChicken);
        //console.log("First chicken " + JSON.stringify(this.registredChicken![0]));
        //JSON.stringify(this.registredChicken![1])?console.log("Second chicken " + JSON.stringify(this.registredChicken![1])):console.log("");
      }
      //If chicken are not registred in localStorage, then call API to retrieve chickens
    } else {
      this.chickenService.getRegistredChickenPlayer(this.player!.id)
        .pipe(
          catchError (() => {
            console.log("Erreur lors du chargement des poules");
            this.registredChicken = [];
            return EMPTY;
          }))
        .subscribe(chickens =>{
            this.registredChicken = chickens;
            this.buildForm();
          }
        );
    }
  }

  buildForm(){
    this.form = this.formBuilder;
    if(this.registredChicken && this.registredChicken?.length>0) {
      console.log("Chicken Units Array length : "+this.chickenUnitsArray?.length);
      this.registredChicken!.map((chicken: Chicken) => {
        if(this.chickenUnitsArray?.length>0) {
          this.chickenUnitsArray.push(this.addChickenUnitFormGroup(true,chicken));
          console.log("Ajout dans form array");
        } else {
          this.chickenUnitsArray = this.formBuilder.array([
            this.addChickenUnitFormGroup(true, chicken)
          ]);
          console.log("1re création du form array");
        }
        console.log("a new registred chicken is added");
      });
    } else {
      this.chickenUnitsArray = this.formBuilder.array([
        this.addChickenUnitFormGroup(false)
      ]);
    }
    this.chickenForm = this.form.group({
      'chickenUnits':this.chickenUnitsArray
    });
    this.chickenUnitsArray.value.forEach((e: string)=> console.log("Chicken Units Array : "+JSON.stringify(e)));
    console.log("New length of fomr array "+this.chickenUnitsArray?.length);
    this.chickenUnits.valueChanges.subscribe(x => {
      this.checkDuplicatesInput('nameChicken');
    });
  }

  submitForm() {
    this.submit = true;
    console.log("Form value: ", this.chickenForm.value);
    this.chickenUnits.value.forEach((chicken: { nameChicken: string, fur: string }, index: number) => {
      if (chicken.nameChicken && chicken.fur) {
        console.log("Chicken unit - chicken: " + JSON.stringify(chicken));
        console.log("Chicken name: " + chicken.nameChicken);
        let chickenPlayer = new Chicken(0, chicken.nameChicken, chicken.fur, this.player!.id);
        console.log("Player : " + JSON.stringify(this.player));
        this.player!.chickens = [];
        this.player!.chickens.push(chickenPlayer);
        this.finalChickens.push(chickenPlayer);
        console.log("ChickenPlayer: " + JSON.stringify(chickenPlayer));
      }
    });
    console.log("Submit - Liste des chickens: " + JSON.stringify(this.finalChickens));
    console.log("player id: " + this.player?.id);
    if (this.player?.id != 0) {
      console.log("Final Chickens before sending to back " + this.finalChickens);
      this.finalChickens.map((chicken, index) => {
        this.chickenService.createChicken(chicken).subscribe((result) => {
          console.log("Chicken enregistré dans le back: " + JSON.stringify(result));
        }, error => {
          this.msgError = error;
          throw new Error("Error while registring chicken :" + error)
          console.log("Error while registring chicken: " + error);
        });
      })
    }
    //Store dans le localstorage
    this.storage.storageSetItem(Constants.KEY_CHICKENS, JSON.stringify(this.finalChickens));
    console.log("Chicken enregistrés en local: " + this.storage.storageGetItem(Constants.KEY_CHICKENS));
    this.router.navigateByUrl('/game');

  }

  addChicken() {
    this.chickenUnits.push(this.addChickenUnitFormGroup(false));
  }

  addChickenUnitFormGroup(isExisting:boolean,chickenRegistred?:Chicken): FormGroup {
    if(isExisting && typeof chickenRegistred != 'undefined') {
      if (this.furOptions.filter(f => f.value === chickenRegistred.fur)[0]){
        this.filteredFurValue = this.furOptions.filter(f => f.value === chickenRegistred.fur)[0];
        console.log("filtetred fur value"+this.filteredFurValue);
      }
      console.log("-addChickenUnitFormGroup- Chicken name "+chickenRegistred.name);
      console.log("-addChickenUnitFormGroup- Fur Value "+this.filteredFurValue?.value);
      return this.formBuilder.group({
        'nameChicken': [chickenRegistred.name],
        'fur': [this.filteredFurValue?.value]
      }, {
        validators: Validators.required,
        updateOn: 'change'
      });
    } else {
      this.filteredFurValue = null;
      return this.formBuilder.group({
        'nameChicken': [''],
        'fur': ['']
      }, {
        validators: Validators.required,
        updateOn: 'change'
      });
    }
  }

  checkDuplicatesInput(key_form: string) {
    this.duplicatedIndex?.forEach((indexArray) => {
      indexArray.forEach(index => {
        let err: { [p: string]: any } | null = this.chickenUnits.at(index)?.get('nameChicken')?.errors as Object || null;
        if (err) {
          delete err['duplicated'];
          if (Object.keys(err)?.length == 0) {
            err = null
          }
        }
        this.chickenUnits.at(index).get(key_form)?.setErrors(err as ValidationErrors);
      })
    });

    let dict: { [item: string]: any } = {};
    this.chickenUnits.value.forEach((item: { [key: string]: string }, index: string) => {
      if (item.nameChicken) {
        dict[item.nameChicken] = dict[item.nameChicken] || [];
        dict[item.nameChicken].push(index);
      }
    });
    this.duplicatedIndex = [];
    Object.keys(dict).forEach((name) => {
      if (dict[name].length > 1) {
        this.duplicatedIndex.push(Object.values(dict[name]));
      }
    });

    this.isThereDuplication = this.duplicatedIndex?.length > 1;
    this.duplicatedIndex = [...new Set(this.duplicatedIndex)]; //remove duplicated elements

    this.duplicatedIndex.forEach((item) => {
        this.chickenUnits.at(item[0]).get(key_form)?.setErrors({duplicated: true});
        this.chickenUnits.at(item[1])?.get(key_form)?.setErrors({duplicated: true});
      }
    );
  }

  get chickenUnits() {
    return this.chickenForm.controls['chickenUnits'] as FormArray;
  }

  get nameChicken() {
    return this.chickenForm.get('nameChicken');
  }

  removeChicken(index: number) {
    this.chickenUnits.removeAt(index);
  }

  setChickenFurOption(value:string){
    console.log("selected value: "+value);
    let x = this.furOptions.filter(f => value === f.value)[0].value;
    console.log(" return value:" +x);
    return x;
  }

//ValidatorFn not used but is working fine
// only for understanding purpose
  duplicateChickenValidator(): ValidatorFn {
    return (formArray: AbstractControl): { [key: string]: string } | null => {
      if (formArray instanceof FormArray) {
        const names = formArray.controls.map(x => x.get('nameChicken')?.value).filter(n => n !== '');
        const check_hasDuplicate = names.some(
          (name, index) => names.indexOf(name, index + 1) != -1
        );
        return check_hasDuplicate ? {error: 'duplicated'} : null;
      }
      throw new Error('formArray is not an instance of FormArray');
    };
  }

  goBack(): void {
    console.log("Go Back - chicken form values: "+JSON.stringify(this.chickenForm.value));
    //Fait casser le storage des chickens
    //this.storage.storageSetItem(Constants.KEY_CHICKENS, this.chickenForm.value);
    this.location.back();
  }
}
