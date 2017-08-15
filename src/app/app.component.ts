import {Component, DoCheck, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {User} from "./user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]

})
export class AppComponent {
  user: User;
  logout: boolean = true;
  constructor(private userService: UserService){
       this.userService.getUser().subscribe(
        (user: User) => {this.user = user; this.logout = false},
        (error: Response) => {console.log(error); this.logout = true}
    );
  }
  // ngOnInit(){
  //   this.userService.getUser().subscribe(
  //       (user: User) => {this.user = user; this.logout = false},
  //       (error: Response) => {console.log(error); this.logout = true}
  //   );
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
