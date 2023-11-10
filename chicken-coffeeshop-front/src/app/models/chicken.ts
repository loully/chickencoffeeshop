import {Player} from "./player";

export class Chicken {

  constructor(public id: number,
              public name: string,
              public fur:string,
              public masterId: number,
              public avatarUrl?: string,
              public hasOrdered?: boolean,
              public orderPassage?:number) {
  }

}
