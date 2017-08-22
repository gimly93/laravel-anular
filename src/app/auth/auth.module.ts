import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "../common/_services/user.service";
import {AuthenticationService} from "./authentication.service";
import {FormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {SocketService} from "../common/_services/socket.service";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../common/_guards/auth.guard";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
      RouterModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
      AuthGuard,
      UserService,
      AuthenticationService,
      SocketService
  ]
})
export class AuthModule { }
