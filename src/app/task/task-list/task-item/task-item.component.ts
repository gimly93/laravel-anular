import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../../task";
import {TaskService} from "../../task.service";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  onUpdateTask(){
    console.log(this.task);
    this.taskService.UpdateTask(this.task);
  }
  onDeleteTask(){
    this.taskService.DeleteTask(this.task);
  }
  delete(): void {
    if (!this.task) { return; }
    this.taskService.delete(this.task)
        .then(task => {
          this.taskService.DeleteTask(this.task);
        });
  }
}
