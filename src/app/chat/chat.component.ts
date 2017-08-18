import {Component, OnInit, OnDestroy, DoCheck} from '@angular/core';
import { ChatService } from './chat.service';
import {UserService} from "../user.service";
import {User} from "../user";
import {RoomService} from "../room.service";

@Component({
  selector: 'chat-component',
  templateUrl: './chat.component.html',
})
export class ChatComponent {

  checkedRoom: boolean= false;
  room;
  user = JSON.parse(localStorage.getItem('currentUser')).user;

  constructor(private chatService: ChatService,private roomService: RoomService) {
    this.chatService.subject.subscribe(
        (room) => {


            this.checkedRoom = true;
          this.room = room;
          console.log('OUR CURRENT ROOM');
          console.log( room);
          console.log( this.room);

        }
    );
  }

}