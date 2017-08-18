import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../user";
import {Http} from "@angular/http";
import {RoomService} from "../room.service";
import {ChatService} from "../chat/chat.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent  implements OnInit, OnDestroy  {
  room;
  messages = [];
  connection;
  message= '';
  listener;
  user = JSON.parse(localStorage.getItem('currentUser')).user;

  to_user
  typingUser;
  logout: boolean = true;
  isTypingprop: boolean = false;
  constructor(private http: Http, private roomService: RoomService, private chatService: ChatService, private userService: UserService) {}


  ngOnInit() {
    this.roomService.getRoomMessages().subscribe( (data) => {
      console.log(data);
      this.room = this.roomService.room;
      this.messages = [];
      this.messages.push(data);


    });


    setInterval( () => {
      this.isTypingprop = false;
    }, 1000 * 5);


    this.connection = this.chatService.getMessages().subscribe( ({ data, time}) => {
      this.messages[0].push(data);



    });

    this.connection = this.chatService.getTypingStatus().subscribe( data => {
      if ( this.user.email !== data ) {
        this.isTypingprop = true;
        this.typingUser = data;
      }
    });
  }



  sendMessage(){
    this.roomService.sendMessage(this.message, this.user).subscribe( (data) => {
      // this.messages[0].push(data);

    });
  }
  isTyping(){
    this.chatService.isTyping(this.user);
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
