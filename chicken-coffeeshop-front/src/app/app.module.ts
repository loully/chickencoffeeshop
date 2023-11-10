import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { HowtoplayComponent } from './components/howtoplay/howtoplay.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StorageService} from "./shared/service/storage.service";
import { BoardChickenComponent } from './components/board/components/board-chicken/board-chicken.component';
import { FormComponent } from './components/form/form.component';
import {CommonModule} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { BoardComponent } from './components/board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    RegisterComponent,
    HowtoplayComponent,
    BoardChickenComponent,
    FormComponent,
    BoardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
