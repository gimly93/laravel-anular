import { Component, OnInit,OnDestroy } from '@angular/core';
import { ChatService } from './chat.service';
import {UserService} from "../user.service";
import {User} from "../user";

@Component({
  selector: 'chat-component',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit, OnDestroy {
  messages = [];
  connection;
  message= '';
  user:User;
  typingUser;
  logout: boolean = true;
  isTypingprop: boolean = false;

  constructor(private chatService: ChatService, private userService: UserService) {}

  sendMessage(){
    this.chatService.sendMessage(this.message, this.user);
  }


  isTyping(){
    this.chatService.isTyping(this.user);
  }

  ngOnInit() {
    setInterval( () => {
      this.isTypingprop = false;
    }, 1000 * 5);
    this.userService.getUser().subscribe(
        (user: User) => {this.user = user; this.logout = false},
        (error: Response) => {console.log(error); this.logout = true}
    );

    this.connection = this.chatService.getMessages().subscribe( ({ data, time}) => {
      this.messages.push(data);
      // this.user.push(data.message);
    });

    this.connection = this.chatService.getTypingStatus().subscribe( data => {
      if ( this.user.email !== data ) {
        this.isTypingprop = true;
        this.typingUser = data;

      }
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}