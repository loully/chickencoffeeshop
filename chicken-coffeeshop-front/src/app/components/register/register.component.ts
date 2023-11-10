import {Component, OnInit, SecurityContext} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../shared/service/storage.service";
import {Constants} from "../../shared/constants";
import {Router} from "@angular/router";
import {PlayerService} from "../../services/player.service";
import {Player} from "../../models/player";
import {Chicken} from "../../models/chicken";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm!:FormGroup;
  pseudoValue!:string;
  result!:JSON;
  object!:string;
  error=false;
  msgError!: string;
  registredUser?: Player | null;
  registredChicken:Chicken[] = [];

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private playerService:PlayerService,
    private storage:StorageService
  ) {}

  ngOnInit(): void {
    this.playerService.getLocalRegistredPlayer().subscribe((player) => {
      this.registredUser = player;
      this.storage.storageSetItem(Constants.KEY_USER,JSON.stringify(player));
      console.log("User enregistré depuis le storage : {}", this.registredUser);
    });
    this.registredUser = JSON.parse(<string>this.storage.storageGetItem(Constants.KEY_USER));
    console.log("store chicken: "+this.storage.storageGetItem(Constants.KEY_CHICKENS));

    this.userForm = this.fb.group({
      pseudo: [this.registredUser?.pseudo, Validators.required],
      rememberme: [this.registredUser?.id !==0]
    });
  }

  submitForm(form: FormGroup) {
    console.log("checkbox value: ",this.userForm.get("rememberMe")?.value);
    this.pseudoValue = this.userForm.value.pseudo;
    let formattedPseudoValue = this.pseudoValue.toString();

    if(form.valid){
      if(this.userForm.get("rememberme")?.value) {
        //2-Player n'est pas dans LocalStorage, demander au back de le créer ou de renvoyer l'existant
        if (formattedPseudoValue !== this.registredUser?.pseudo) {
          console.log('Storage : {}', this.pseudoValue.toString());
          this.playerService.createPlayer(formattedPseudoValue).subscribe((data) => {
            console.log('Player {} est bien enregistré !', data);
            this.savePlayerLocally(data);
            this.saveRegistredChicken(data.chickens);
            console.log("Chickens from data: "+data.chickens);
            this.router.navigate(['/players']);
          }, error => {
            this.handleMsgError(error)
          });
          //1-User enregistré dans Storage, récupérer le player dans le back
        } else {
          this.playerService.getRegistredPlayer(formattedPseudoValue).subscribe((data) => {
            console.log('Player {} actuellement enregistré', data);
            this.savePlayerLocally(data);
            this.saveRegistredChicken(data.chickens);
            console.log("Chickens from data: "+data.chickens);
            this.router.navigateByUrl('/players');
          }, error => {
            this.handleMsgError(error)
          });
        }
      } else {
        this.playerService.setLocalRegistredPlayer(new Player(0,formattedPseudoValue,[]));
        this.router.navigateByUrl('/players');
      }
    }
  }

  saveRegistredChicken(chickenList:Chicken[]){
    chickenList?.forEach(value => this.registredChicken.push(value));
    if(this.registredChicken.length > 0){
      this.storage.storageSetItem(Constants.KEY_CHICKENS,JSON.stringify(JSON.stringify(this.registredChicken)));
      console.log("Chicken founded: "+JSON.stringify(this.registredChicken));
    }
  }

  savePlayerLocally(player:Player){
    this.storage.storageSetItem(Constants.KEY_USER,JSON.stringify(player));
    this.playerService.setLocalRegistredPlayer(player);
  }

  handleMsgError(error:any){
    this.error=true;
    this.msgError = error;
    console.log("Erreur: {}",error);
  }


}
