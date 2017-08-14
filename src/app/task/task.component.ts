import { Component, OnInit } from '@angular/core';
import {TaskService} from "./task.service";
import {Task} from "./task";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [TaskService]
})
export class TaskComponent implements OnInit {

  constructor(private taskService: TaskService) { }
  // tasks: Task[] = this.taskService.TASKS;
  tasks: Task[];
  ngOnInit() {
    this.onGetTasks();
  }
  onGetTasks() {
    this.taskService.getTasks().subscribe(
        (tasks: Task[]) => this.tasks = tasks,
        (error: Response) => console.log(error)
    );
  }
}
