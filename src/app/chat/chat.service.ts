import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class ChatService {
    private url = 'http://localhost:5000';
    private socket;
    public room;

    constructor(){
        this.socket = io(this.url);

    }
    sendMessage(message, user){
        console.log(this.room);
        if(this.room){
            this.socket.emit('add-my-new-message-room', {message: message, user: user.email, room : this.room});
        }else{
            this.socket.emit('add-my-new-message', {message: message, user: user.email});

        }
        // this.socket.emit('add-message', message);
    }
    login(user){
        this.socket.emit('login', {user: user});

    }
    joinRoom(room){
        this.room = room;
        this.socket.emit('room', {room: room});

    }
    getOnlineUsers() {
        let observable = new Observable(observer => {
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
                    // this.socket.disconnect();
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
                // this.socket.disconnect();
            };
        })
        return observable;
    }
    // getGreetingMessage() {
    //     let observable = new Observable(observer => {
    //         this.socket = io(this.url);
    //         this.socket.on('greeting-message', (data) => {
    //             observer.next(data);
    //         });
    //         return () => {
    //             this.socket.disconnect();
    //         };
    //     })
    //     return observable;
    // }
}