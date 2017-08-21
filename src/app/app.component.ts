import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "./_services/authentication.service";

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html'
})

export class AppComponent {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,

       ) { }
    logout(){
         this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}