import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../../../shared/service/storage.service";
import {Constants} from "../../../../shared/constants";

@Component({
  selector: 'app-board-chicken',
  templateUrl: './board-chicken.component.html',
  styleUrls: ['./board-chicken.component.scss']
})
export class BoardChickenComponent implements OnInit {

  chickenNames = [];
  userChicken!:string;

  constructor(
    private storage:StorageService
  ) { }

  ngOnInit(): void {
    let userChicken=JSON.parse(this.storage.storageGetItem(Constants.KEY_CHICKENS) || '{}');
    console.log("storage chicken are: ",this.storage.storageGetItem(Constants.KEY_CHICKENS));
    for(const unit in userChicken){
      console.log("Each chicken: ",unit);
      //this.chickenNames.push(unit['name']);
    }
  }

}
