import { Routes, RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';

import {AuthGuard} from '../common/_guards/auth.guard';

import {ChatComponent} from './chat.component';


const routes: Routes = [
    { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
})
export class ChatRoutingModule{}
