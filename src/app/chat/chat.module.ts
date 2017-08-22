import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatComponent} from './chat.component';
import {RoomComponent} from './room/room.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserService} from "./user-list/user.service";
import {ChatRoutingModule} from "./chat-routing.module";
import {RoomService} from "./room/room.service";
import {FormsModule} from "@angular/forms";
import {AuthGuard} from "../common/_guards/auth.guard";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChatRoutingModule
  ],
  declarations: [
      ChatComponent,
      RoomComponent,
    UserListComponent
  ],
  providers:[
    UserService,
      RoomService
  ]
})
export class ChatModule { }
