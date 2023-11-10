import {HttpHeaders} from "@angular/common/http";

export class Constants {
  static readonly URL_PLAYER = 'http://localhost:8080/player';
  static readonly URL_CHICKEN = 'http://localhost:8080/chicken';
  static readonly KEY_CHICKENS = 'chickens';
  static readonly KEY_USER = 'user';
  static readonly HTTP_OPTIONS = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
