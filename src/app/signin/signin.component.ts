import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {NgForm} from '@angular/forms';
import {Location} from '@angular/common';
import {Router} from "@angular/router";

import {UserService} from "../user.service";
import {User} from "../user";
import {ChatService} from "../chat/chat.service";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit,OnDestroy {
  user: User;
  logout:boolean =  true;
  authenticate;
  logedIn = new Subject();
  constructor(private router: Router, private userService: UserService, private chatService: ChatService, private authService: AuthService) { }


  ngOnInit() {
  }
  onSignin(form: NgForm)
  {
      this.authenticate =   this.authService.signin(form.value.email, form.value.password).subscribe(
        tokenData => {
          this.userService.getUser().subscribe(
              (user) => {
                this.logout = false;
              },
              (error: Response) => {console.log(error); this.logout = true}
          );
            this.router.navigate(['chat']);
        },
          (error: Response)  => console.log(error)
    );

  }
    ngOnDestroy(){
        this.authenticate.unsubscribe();
    }
}
