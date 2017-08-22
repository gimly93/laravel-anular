import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    token;
    constructor(private http: Http) { }

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
                    }
                    localStorage.setItem('token', response.json().token);
                    return user;
                }
            );
    }
    signin(email: string, password: string) {
        return this.http.post('http://homestead.app/api/user/signin',
            {email: email, password: password},
            {headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})})
            .map(
                (response: Response) => {
                    this.token = response.json().token;
                    localStorage.setItem('token', this.token);
                    return this.token;
                }
            );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}