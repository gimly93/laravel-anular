import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../task";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() tasks: Task;
  constructor() { }

  ngOnInit() {
    console.log(localStorage.getItem('token'));
  }

}
