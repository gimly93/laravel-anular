import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {Injectable, OnDestroy} from "@angular/core";
@Injectable()
export class SocketService implements  OnDestroy{
    private url = 'http://localhost:5000';
    private socket;
    public room;
    subject = new Subject();
    constructor(){
        this.socket = io(this.url);

    }
    sendMessage(message, user){

        if(this.room){
            this.socket.emit('add-my-new-message-room', {message: message, from: user.id, room : this.room});
        }else{
            this.socket.emit('add-my-new-message', {message: message, user: user.email});

        }
        // this.socket.emit('add-message', message);
    }
    login(){
        if(!this.socket)
        this.socket = io(this.url);
        const user = JSON.parse(localStorage.getItem('currentUser')).user;
        console.log('starting socket login', user);

        this.socket.emit('login', {user: user});

    }
    logout(user){
        if(!this.socket)
            this.socket = io(this.url);

        localStorage.removeItem('currentUser');
        console.log('STARTING LOGOUT',user);
        this.socket.emit('logout',{user: user});

    }
    Room(user1, user2){
        // this.room = room;
        this.socket.emit('room-dialog', {user1: user1, user2: user2});

    }
    joinRoom(room){
        this.room = room;
        this.socket.emit('room', {room: room});
        this.subject.next(room);
    }
    getOnlineUsers() {
        const observable = new Observable(observer => {
            this.socket.on('login-response-from-server', (data) => {
                observer.next(data);
            });

            return () => {

            };
        })
        return observable;
    }

    isTyping(user){
        this.socket.emit('is-typing', {user: user.email});
        // this.socket.emit('add-message', message);
    }

    getMessages() {

        let observable = new Observable(observer => {
            this.socket.on('message-from-server', (data) => {
                data.text.time = data.time;
                observer.next({data:data.text, time:data.time});
            });
            return () => {
            };
        })
        return observable;



    }
    getTypingStatus() {
        let observable = new Observable(observer => {
            this.socket.on('is-typing-from-server', (data) => {
                observer.next(data.user.user);
            });
            return () => {
            };
        })
        return observable;
    }
ngOnDestroy(){
        if(this.socket){
            // this.socket.disconnect();
        }
}
}