import {Injectable} from "@angular/core";
import {Headers, Http,Response} from "@angular/http";
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import {UserService} from "./user.service";
import {AuthService} from "./auth.service";
import {ChatService} from "./chat/chat.service";
@Injectable()

export class RoomService{
    listener1;
    listener2;
    messages;
    to_user;
    room;
    user = JSON.parse(localStorage.getItem('currentUser')).user;
    token = JSON.parse(localStorage.getItem('currentUser')).token;

    constructor(private http: Http, private authService: AuthService,private chatService: ChatService){}

    findRoom(user1, user2){
        return this.http.post('http://homestead.app/api/room?token=' + this.token,
            {user1: user1, user2: user2})
            .map(
                (response: Response) =>{
                    this.room = response.json().room[0];
                    this.listener1 = response.json().user1[0];
                    this.listener2 = response.json().user2[0];
                    return this.room;
                });
    }
    sendMessage(messages, user){

        return this.http.post('http://homestead.app/api/message?token=' + this.token,
            {message: messages, from: user.id, room_id: this.room.id, to: this.to_user.id})
            .map(
                (response: Response) =>{
                    this.chatService.sendMessage(messages,user);
                    this.messages = response.json().message;
                    return this.messages;
                });
    }
    // markAsRead(message){
    //
    //     return this.http.get('http://homestead.app/api/message/asread/' + message.id + '?token=' + this.token)
    //         .map(
    //             (response: Response) =>{
    //                 // this.chatService.sendMessage(messages,user);
    //                 // this.messages = response.json().message;
    //                 return response.json().message;
    //                 // return this.messages;
    //             });
    // }
    getRoomMessages() :Observable<any>{

        return this.http.get('http://homestead.app/api/messages/' + this.room.id + '?token=' + this.token)
            .map(
                (response: Response) =>{
                    return this.messages = response.json().messages ;
                }
            ).do(
                tokenData => {
                    localStorage.setItem('token', tokenData.token);
                }
            );
    }

}