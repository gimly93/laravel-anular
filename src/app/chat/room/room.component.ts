import {Component, OnInit, OnDestroy, Input, OnChanges} from '@angular/core';
import {Http} from "@angular/http";
import {RoomService} from "./room.service";
import {SocketService} from "../../common/_services/socket.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent  implements OnInit, OnDestroy ,OnChanges {
  @Input() changedRoom;
  room;
  messages = [];
  connection;
  message= '';
  user = JSON.parse(localStorage.getItem('currentUser')).user;

  to_user;
  typingUser;
  logout: boolean = true;
  isTypingprop: boolean = false;
  constructor(
      private http: Http,
      private roomService: RoomService,
      private socketService: SocketService,
  ) {}
  ngOnChanges(changes) {
    this.getMessages();
  }
  getMessages(){
    this.roomService.getRoomMessages().subscribe( (data) => {
      this.room = this.roomService.room;
      if(this.roomService.listener1.id !==this.user.id){
        this.to_user =this.roomService.listener1;
      }
      if(this.roomService.listener2.id !==this.user.id){
        this.to_user = this.roomService.listener2;
      }
      this.messages = [];
      this.messages.push(data);


    });
  }

  ngOnInit() {

    setInterval( () => {
      this.isTypingprop = false;
    }, 1000 * 5);
    this.connection = this.socketService.getMessages().subscribe( ({ data, time}) => {
      data.as_read =0;
      this.messages[0].push(data);

    });

    this.connection = this.socketService.getTypingStatus().subscribe( data => {
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
  OnCtrlEnter(event){
    if (event.keyCode == 13 && event.ctrlKey) {
      this.sendMessage();
    }
  }
  sendMessage(){
    this.roomService.sendMessage(this.message, this.user).subscribe( (data) => {
      this.message = '';
      // this.messages[0].push(data);

    });
  }
  isTyping(){
    this.socketService.isTyping(this.user);
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
