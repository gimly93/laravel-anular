import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {SocketService} from "./common/_services/socket.service";

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
})

export class AppComponent {
    constructor(private router: Router,private socketService: SocketService) { }

    logout(){
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if(user){
            this.socketService.logout(user.user);
        }
        this.router.navigate(['/login']);
    }
}