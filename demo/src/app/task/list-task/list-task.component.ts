import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../task.service';
import {Tasks} from '../model/tasks';
import {ActivatedRoute, Router} from "@angular/router";
import {DeleteTaskComponent} from '../delete-task/delete-task.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  taskList: any;
  taskSub: any;
  projectList: any;
  p: number;
  formValue: FormGroup;
  taskId: number;
  taskName: String;
  progress: number;
  id: number;
  taskDto: any;
  doingTask = [];
  doneTask =  [];
  checkTime: boolean = false;
  project : any;
  labelList: any;
  labelCreate = [];
  labels: any;
  searchLabel = [];

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
   this.init()
    this.formValue = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      date: ['', [Validators.required]],
      end: ['', [Validators.required]],
      projectId: ['', [Validators.required]],
      labels: ['', [Validators.required]],
    })

  }

  init(){
    this.taskService.getAllProject().subscribe(data => {
      this.projectList = data['data']
    })
    this.taskService.getAllLabel().subscribe(data => {
      this.labelList = data
      console.log(123)
      console.log(this.labelList)
    })
    this.taskService.getAll(null).subscribe(data => {
      this.taskList = data['data']
      console.log(this.taskList);
    })

  }

  getById(id: number) {
    console.log(id);
    this.doneTask = [];
    this.doingTask = [];

    this.taskService.getById(id).subscribe(value => {
      this.taskSub = value['data']
      console.log(this.taskSub)
      for (let i = 0; i < this.taskSub.length; i++){
        if (this.taskSub[i].taskDTO.progress != 100){
          this.doingTask.push(this.taskSub[i])
        }else
          this.doneTask.push(this.taskSub[i])
        console.log(this.doneTask)
      }
    })
  }

  delete(id: number) {
    console.log(id);
    this.taskService.finById(id).subscribe(data => {
      const dialogRef = this.matDialog.open(DeleteTaskComponent, {
        width: "500px",
        data: {data1: id}
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    })
  }

  create() {
    console.log(this.formValue.value);
    this.checkTime = false;
    this.formValue.get('labels').setValue(this.labelCreate);
    console.log(567);
    console.log(this.formValue.value);
    if (this.formValue.invalid) {
      alert('There was an error!');
    } else {
      this.taskService.save(this.formValue.value).subscribe(
        () => {
          this.ngOnInit();
        }, error => {
          var check = error.error.checkDate;
          if(check != null) {
            this.checkTime = true;
          }
        }
      );
      let ref = document.getElementById('cancel');
      ref?.click();
    }
    this.labelCreate = [];
  }

  addLabel(label: any){
    this.labelCreate.push(label.value)
    label.value = '';
  }

  searchByLabel() {
    this.searchLabel= [];
    var check = document.getElementsByClassName("check")
    for (let i = 0; i < check.length; i++){
      if (check[i].checked){
        this.searchLabel.push(check[i].nextSibling.textContent)
        console.log(check[i].nextSibling.textContent)

      }
    }
    this.taskService.getAll(this.searchLabel).subscribe(value => {
      this.taskList = value['data']
      console.log(value)
    })
  }
}
