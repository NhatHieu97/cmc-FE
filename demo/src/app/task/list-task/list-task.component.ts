import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TaskService} from '../task.service';
import {Tasks} from '../model/tasks';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  taskList: any;
  projectList: any;
  p: number;
  formValue: FormGroup;
  taskId: number;
  taskName:String;
  progress: number;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.taskService.getAllProject().subscribe(value =>{
      this.projectList = value;
      console.log(value);
      this.taskService.getAll().subscribe(data =>{
        this.taskList = data;
        console.log(data);
      })
    })


  }

  getId(id, name, progress) {
    this.taskId = id;
    this.taskName = name
    this.progress = progress

  }

  delete() {

  }
}
