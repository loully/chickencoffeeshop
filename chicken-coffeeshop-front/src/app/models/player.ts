import {Chicken} from "./chicken";

export class Player {

  constructor(
    public id:number,
    public pseudo: string,
    public chickens: Chicken[],
    public avatarUrl?: string,
    public subscriptionDate?: Date,
    public isPlaying?:boolean
  ) {}
}
