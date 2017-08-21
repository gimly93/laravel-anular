import {Component, OnInit, OnDestroy, Input, OnChanges} from '@angular/core';
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
export class RoomComponent  implements OnInit, OnDestroy ,OnChanges {
  @Input() changedRoom;
  room;
  listener1;
  listener2;
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
  ngOnChanges(changes) {
    this.getMessages();
  }
  getMessages(){
    this.roomService.getRoomMessages().subscribe( (data) => {
      this.room = this.roomService.room;
      this.listener1 = this.roomService.listener1;
      this.listener2 = this.roomService.listener2;

      this.messages = [];
      this.messages.push(data);


    });
  }

  ngOnInit() {

    setInterval( () => {
      this.isTypingprop = false;
    }, 1000 * 5);
    this.connection = this.chatService.getMessages().subscribe( ({ data, time}) => {
      data.as_read =0;
      this.messages[0].push(data);

    });

    this.connection = this.chatService.getTypingStatus().subscribe( data => {
      if ( this.user.email !== data ) {
        this.isTypingprop = true;
        this.typingUser = data;
      }
    });
  }


  markAsRead(message){
    // console.log(message);
    // console.log(key);
    // console.log( this.messages[key]);
    // if(message.as_read == 0){
    //   this.roomService.markAsRead(message).subscribe( (data) => {
    //     // this.messages[key] = data;
    //     // console.log( 'DATA from server',data);
    //
    //
    //   });
    // }

  }
  sendMessage(){
    this.roomService.sendMessage(this.message, this.user).subscribe( (data) => {
      this.message = '';
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
