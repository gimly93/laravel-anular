import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";

import 'rxjs/Rx';
@Injectable()
export class AuthService{

constructor(private http: Http){}
    token;
    signup(username: string, email: string, password: string) {
       return this.http.post('http://homestead.app/api/user',
            {name: username, email: email, password: password},
            {headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})});
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

    getToken() {
        return localStorage.getItem('token');
    }
}