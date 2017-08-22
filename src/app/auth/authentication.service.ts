import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    token;
    loginStatus:boolean=false;
    user;
    constructor(private http: Http) {
       const user = JSON.parse(localStorage.getItem('currentUser'));

        if(user){
            this.user = user.user;
            this.loginStatus =true;
        }
    }

    login(email: string, password: string) {
        return this.http.post('http://homestead.app/api/user/signin',
            {email: email, password: password},
            {headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})})
            .map(
                (response: Response) => {
                    let user = response.json();
                    console.log(user);
                    if (user && user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        this.loginStatus =true;
                    }
                    localStorage.setItem('token', response.json().token);
                    return user;
                }
            );
    }


    logout() {
        this.loginStatus = false;

        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}