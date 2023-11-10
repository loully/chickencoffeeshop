import { Component } from '@angular/core';
import {Player} from "./models/player";
import {PlayerService} from "./services/player.service";
import {StorageService} from "./shared/service/storage.service";
import {Constants} from "./shared/constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chicken-coffeeshop-front';
  logginPlayer!:Player | null;
  isLoggedIn = false;

  constructor(
    private playerService: PlayerService,
    private storage:StorageService
  ) {}

  ngOnInit():void {
    this.playerService.getLocalRegistredPlayer().subscribe((player) =>
      this.logginPlayer = JSON.parse(<string>this.storage.storageGetItem(Constants.KEY_USER))
    );
    if(this.logginPlayer) {
      this.playerService.setLocalRegistredPlayer(this.logginPlayer);
      this.isLoggedIn = true;
    };
    console.log("Player On Init :{}", this.logginPlayer);
  }

}
