import {Injectable, OnInit}  from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

import { Task} from './task';
import {AuthService} from "../auth.service";

@Injectable()
export class TaskService {
    taskToUpdate: Task;
    taskPosition: number;
    private headers = new Headers({'Content-Type': 'application/json'});

    TASKS: Task[] ;
    constructor(private http: Http, private authService: AuthService) {}

    UpdateTask(task: Task) {
        this.taskToUpdate = task;
        this.taskPosition = this.TASKS.indexOf(task);

    }
    DoUpdateTask(task: Task) {
        this.taskToUpdate = undefined;
        this.taskPosition = undefined;
    }

    update(task: Task): Promise<Task> {
        const token = this.authService.getToken();
        const url = 'http://homestead.app/api/task/' + task.id + '?token=' + token;
    return this.http
        .put(url , JSON.stringify(task))
        .toPromise()
        .then(res => res.json().task as Task)
        .catch(this.handleError);
}
    delete(task: Task): Promise<Task> {
        const token = this.authService.getToken();

        const url = 'http://homestead.app/api/task/' + task.id + '?token=' + token;
    return this.http
        .delete(url)
        .toPromise()
        .then(res => res.json().task as Task)
        .catch(this.handleError);
}
    DeleteTask(task: Task){
        this.TASKS.splice(this.TASKS.indexOf(task), 1);
    }
    create(task: Task): Promise<Task> {
        const token = this.authService.getToken();

        return this.http
            .post('http://homestead.app/api/task' + '?token=' + token, JSON.stringify(task))
            .toPromise()
            .then(res => res.json().task as Task)
            .catch(this.handleError);
    }

    AddTask(task: Task) {
        this.TASKS.push(task);
        if(this.taskToUpdate)
            this.taskToUpdate = undefined;
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getTasks(): Observable <any> {
        return this.http.get('http://homestead.app/api/tasks').map(
            (response: Response) => {
                this.TASKS = response.json().tasks;
                return this.TASKS;
            }
        );
    }
}