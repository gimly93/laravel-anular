import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { TaskFormComponent } from './task/task-form/task-form.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TaskItemComponent } from './task/task-list/task-item/task-item.component';
import {FormsModule} from "@angular/forms";

import {routing} from "./app.routing";

import {TaskService} from "./task/task.service";
import {HttpModule} from "@angular/http";
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";
import {RoomService} from "./room.service";
import { ChatComponent } from './chat/chat.component';
import {ChatService} from "./chat/chat.service";
import { UserListComponent } from './user-list/user-list.component';
import { RoomComponent } from './room/room.component';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./_guards/auth.guard";
import {AlertService} from "./_services/alert.service";
import {AuthenticationService} from "./_services/authentication.service";
import {AlertComponent} from "./_directives/alert.component";

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,

    ChatComponent,
    UserListComponent,
    RoomComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing


  ],
  providers: [
      TaskService,
    AuthService,
    AuthGuard,
    AuthenticationService,
  AlertService,
    UserService,
    ChatService,
    RoomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
