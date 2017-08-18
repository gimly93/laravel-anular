import {Component,  OnDestroy, OnInit} from '@angular/core';
import {User} from "../user";
import {UserService} from "../user.service";
import {ChatService} from "../chat/chat.service";
import {RoomService} from "../room.service";
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit ,OnDestroy{

  users: User[];
  onlineUsers;
  connection ;
    user = JSON.parse(localStorage.getItem('currentUser')).user;

  constructor(private roomService: RoomService, private userService: UserService, private chatService: ChatService){
  }
  // createRoom(room){
  //   this.chatService.joinRoom(room);
  // }
  Room(user){
    this.roomService.to_user = user;
    this.roomService.findRoom(this.user.id, user.id).subscribe(
        data => {
          console.log(this.roomService.room);
          this.chatService.joinRoom(this.roomService.room.id);

        },
    );
  }
  ngOnInit() {
      this.connection = this.chatService.getOnlineUsers().subscribe( (data) => {
          localStorage.setItem('onlineUsers', JSON.stringify(data));
          this.onlineUsers = data;
      });
      this.onlineUsers = JSON.parse(localStorage.getItem('onlineUsers'));
        console.log(this.onlineUsers);
        console.log(this.user);


  }
  ngOnDestroy(){
      console.log('user list destroyed')
      this.connection.unsubscribe();
}

}
