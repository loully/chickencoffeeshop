import { Injectable } from '@angular/core';
import {Chicken} from "../models/chicken";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Constants} from "../shared/constants";
import {BehaviorSubject, Observable} from "rxjs";
import {Player} from "../models/player";

@Injectable({
  providedIn: 'root'
})
export class ChickenService {

  private actualChickenSubject: BehaviorSubject<Chicken | null> = new BehaviorSubject<Chicken | null>(null);
  private actualChicken : Observable<Chicken | null> = this.actualChickenSubject.asObservable();

  constructor(private http:HttpClient) { }

  public createChicken(chicken:Chicken){
    let body = {
     name: chicken.name,
      fur: chicken.fur,
      masterId: chicken.masterId
    };
    let url = Constants.URL_CHICKEN+"/new";
    return this.http.post<Chicken>(url,body, Constants.HTTP_OPTIONS);
  }

  public setLocalActualChicken(chicken:Chicken){
    return this.actualChickenSubject.next(chicken);
  }

  public getLocalActualChicken(chicken:Chicken){
    return this.actualChicken;
  }

  //to server
  public getRegistredChickenPlayer(playerId: number):Observable<Chicken[]> {
    const url = `${Constants.URL_CHICKEN}/${playerId}`;
    return this.http.get<Chicken[]>(url);
  }

}
