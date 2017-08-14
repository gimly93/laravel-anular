import {Component, DoCheck, OnInit} from '@angular/core';
import {Task} from "../task";
import {TaskService} from "../task.service";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, DoCheck {
  task: Task = new Task(0, '' , '' , 0,  '', '');
  emptyTask: Task = new Task(0, '' , '' , 0,  '', '');
  taskPosition: number;
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    console.log(this.taskService.TASKS);
  }

  add(): void {
    if (!this.task) { return; }
    this.taskService.create(this.task)
        .then(task => {
          this.taskService.AddTask(this.task);
        });
  }
  update(): void {
    if (!this.task) { return; }
    this.taskService.update(this.task)
        .then(task => {
          this.taskService.DoUpdateTask(this.task);
          this.taskPosition = undefined;
          this.task = this.emptyTask;
        });
  }
  ngDoCheck() {
    if ( this.taskService.taskToUpdate ) {
      this.task = this.taskService.taskToUpdate;
      this.taskPosition = this.taskService.taskPosition;

    }
  }
}
