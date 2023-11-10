import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Constants} from "../shared/constants";
import {Player} from "../models/player";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private actualPlayerSubject : BehaviorSubject<Player | null>  = new BehaviorSubject<Player | null>(null);
  private actualPlayer: Observable<Player | null> =this.actualPlayerSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  //To server
  public createPlayer(pseudo: string):Observable<Player> {
    return this.http.post<Player>(Constants.URL_PLAYER,pseudo);
  }

  public getRegistredPlayer(pseudoName:string):Observable<Player> {
    const url = `${Constants.URL_PLAYER}/${pseudoName}`;
    return this.http.get<Player>(url);
  }

  //To Local
  public getLocalRegistredPlayer() {
    return this.actualPlayer;
  }

  public setLocalRegistredPlayer(value:Player) {
      this.actualPlayerSubject.next(value);
  }

}
