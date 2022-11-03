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
  label: any

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
      project: ['', [Validators.required]],
    })

  }

  init(){
    this.taskService.getAll().subscribe(data => {
      this.taskList = data['data']
      console.log(this.taskList);
    })
    this.taskService.getAllLabel().subscribe(data => {
      this.labelList = data
      console.log(data);
    })
    // this.taskService.getByProjectId(this.taskList.projectId).subscribe(data => {
    //   this.projectList = data['data']
    // })
  }

  getById(id: number) {
    console.log(id);
    this.doneTask = [];
    this.doingTask = [];

    this.taskService.getById(id).subscribe(value => {
      this.taskSub = value['data']
      console.log(this.taskSub);
      console.log(this.taskSub)
      for (let i = 0; i < this.taskSub.length; i++){
        if (this.taskSub[i].progress != 100){
          this.doingTask.push(this.taskSub[i])
        }else
          this.doneTask.push(this.taskSub[i])
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
    this.checkTime = false;
    this.formValue.get('label').setValue(this.labelCreate);
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
  }

  addLabel(label: any){
    this.labelCreate = [];
    var labelArray = document.getElementsByClassName("label");
    for (var i = 0; i < labelArray.length; i++){
      if (labelArray[i].checked){
        this.taskService.finByIdLabel(labelArray[i].value).subscribe(value => {
          this.labelCreate.push(value)
        })

      }
    }

  }
}
