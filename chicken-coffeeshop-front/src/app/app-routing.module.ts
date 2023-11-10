import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {HowtoplayComponent} from "./components/howtoplay/howtoplay.component";
import {BoardChickenComponent} from "./components/board/components/board-chicken/board-chicken.component";
import {FormComponent} from "./components/form/form.component";
import {BoardComponent} from "./components/board/board.component";

const routes: Routes = [
  { path:'', component: HomeComponent},
  { path:'user', component: RegisterComponent},
  { path:'howtoplay', component: HowtoplayComponent},
  { path:'players', component: FormComponent},
  { path:'game', component: BoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
