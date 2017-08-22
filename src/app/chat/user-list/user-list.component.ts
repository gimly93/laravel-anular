import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {RoomService} from '../room/room.service';
import {Observable} from 'rxjs/Observable';
import {SocketService} from "../../common/_services/socket.service";
import {User} from "./user";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
    @Output() onRoomChange = new EventEmitter<boolean>();
    users: User[];
    onlineUsers;
    connection;
    user = JSON.parse(localStorage.getItem('currentUser')).user;
    // user = this.userService.user;

    constructor(private roomService: RoomService,  private socketService: SocketService) {
    }

    Room(user) {
        this.roomService.to_user = user;
        this.roomService.findRoom(this.user.id, user.id).subscribe(
            data => {
                console.log(this.roomService.room);
                this.socketService.joinRoom(this.roomService.room.id);
                this.onRoomChange.emit(user);

            },
        );
    }

    ngOnInit() {
        console.log('ONINIT',this.onlineUsers);
        this.connection = this.socketService.getOnlineUsers().subscribe((data) => {
            localStorage.setItem('onlineUsers', JSON.stringify(data));
            this.onlineUsers = data;
            console.log(this.onlineUsers);
        });
        // this.onlineUsers = JSON.parse(localStorage.getItem('onlineUsers'));


    }

    ngOnDestroy() {
        this.connection.unsubscribe();
    }

}
