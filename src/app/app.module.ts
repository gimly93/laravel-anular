import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { TaskFormComponent } from './task/task-form/task-form.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TaskItemComponent } from './task/task-list/task-item/task-item.component';
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {TaskService} from "./task/task.service";
import {HttpModule} from "@angular/http";
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import {AuthService} from "./auth.service";

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskFormComponent,
    TaskListComponent,
    TaskItemComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
      FormsModule,
    AppRoutingModule,
    HttpModule,

  ],
  providers: [TaskService, AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
