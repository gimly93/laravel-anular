import {Injectable}  from '@angular/core';
import {Http, RequestOptions, Response,Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

import {AuthService} from "../../auth.service";
import {User} from "../../chat/user-list/user";

@Injectable()
export class UserService {

    private headers = new Headers({'Content-Type': 'application/json'});

    user: User ;
    users: User[];
    constructor(private http: Http, private authService: AuthService) {}

    create(user: User) {
        return this.http.post('http://homestead.app/api/user',
            user,
            {  headers: new Headers({'X-Requested-With': 'XMLHttpRequest'} )}
            ).map((response: Response) => response.json());
    }
    getUser(): Observable <any> {
        const token = this.authService.getToken();

        return this.http.get('http://homestead.app/api/user/info?token=' + token).do((response: Response) => {
            this.user = response.json().user;
            localStorage.setItem('user', JSON.stringify(this.user));
            return this.user;

        });
    }
    getUserData() {
        return JSON.parse(localStorage.getItem('user'));
    }
    getUserList(): Observable <any> {
        const token = this.authService.getToken();
        return this.http.get('http://homestead.app/api/user/list?token=' + token).map(
            (response: Response) => {
                this.users = response.json().userList;
                return this.users;
            }
        );
    }
}