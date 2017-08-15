import {Injectable}  from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

import { User} from './user';
import {AuthService} from "./auth.service";

@Injectable()
export class UserService {

    private headers = new Headers({'Content-Type': 'application/json'});

    user: User ;
    constructor(private http: Http, private authService: AuthService) {}
    getUser(): Observable <any> {
        const token = this.authService.getToken();
        return this.http.get('http://homestead.app/api/user/info?token=' + token).map(
            (response: Response) => {
                this.user = response.json().user;
                return this.user;
            }
        );
    }
}