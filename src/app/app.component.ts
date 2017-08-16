import {Component, DoCheck, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {User} from "./user";
import {ChatService} from "./chat/chat.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]

})
export class AppComponent {
  user: User;
  logout: boolean = true;
  onlineUsers: User[];

  constructor(private userService: UserService,private chatService:ChatService){
       this.userService.getUser().subscribe(
        (user) => {
          this.user = user;
          this.logout = false;
          this.chatService.login(user);
          },
        (error: Response) => {console.log(error); this.logout = true}
    );

  }
  // ngOnInit(){
  //   this.userService.addOnlineUserList();
    // this.userService.getUser().subscribe(
    //     (user: User) => {this.user = user; this.logout = false},
    //     (error: Response) => {console.log(error); this.logout = true}
    // );
  // }
  // ngDoCheck(){
  //   if(!this.user){
  //     this.userService.getUser().subscribe(
  //         (user: User) => {this.user = user; this.logout = false},
  //         (error: Response) => {console.log(error); this.logout = true}
  //     );
  //   }
  //
  // }
}
