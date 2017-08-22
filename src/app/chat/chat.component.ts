import {Component, OnInit, OnDestroy, DoCheck} from '@angular/core';

import {SocketService} from '../common/_services/socket.service';
import {User} from './user-list/user';


@Component({
    selector: 'chat-component',
    templateUrl: './chat.component.html',
})
export class ChatComponent {

    checkedRoom;
    roomChanged: User;
    room;
    user = JSON.parse(localStorage.getItem('currentUser')).user;

    constructor(private socketService: SocketService) {
        console.log('constructor Initialized');
        this.socketService.subject.subscribe(
            (room) => {
                this.checkedRoom = true;
                this.room = room;
            }
        );
    }

    changeRoom(user) {
        this.roomChanged = user;
    }

}