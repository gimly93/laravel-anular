import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskComponent }  from './task/task.component';
import {SigninComponent} from "./signin/signin.component";
import {SignupComponent} from "./signup/signup.component";

const routes: Routes = [
    { path: '', redirectTo: '/task', pathMatch: 'full' },
    { path: 'task',  component: TaskComponent },
    { path: 'signin',  component: SigninComponent },
    { path: 'signup',  component: SignupComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}