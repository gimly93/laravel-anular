import {Component, Input, OnInit} from '@angular/core';
import {User} from "../user";
import {UserService} from "../user.service";
import {ChatService} from "../chat/chat.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() messages;
  users: User[];
  onlineUsers;
  connection ;
  constructor(private userService: UserService, private chatService: ChatService){
     this.connection = this.chatService.getOnlineUsers().subscribe( (data) => {
      this.onlineUsers = data;
    });
    this.userService.getUserList().subscribe(
        (users: User[]) => { this.users = users}
    );
  }
  createRoom(room){
    console.log(room);
    this.chatService.joinRoom(room);
  }
  ngOnInit() {
  }

}
