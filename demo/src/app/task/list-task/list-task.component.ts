import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../task.service';
import {Tasks} from '../model/tasks';
import {ActivatedRoute, Router} from "@angular/router";

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
  checkTime : boolean = false;
  labelList: any;
  labelCreate = [];
  label: any

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.init();
    this.formValue = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      date: ['', [Validators.required]],
      end: ['', [Validators.required]],
      projectId: ['', [Validators.required]],
      label: ['', [Validators.required]],
    })
  }

  init(){
    this.taskService.getAllProject().subscribe(data => {
      this.projectList = data
    })
    this.taskService.getAll().subscribe(data => {
      this.taskList = data;
      console.log(this.taskList)
    })
    this.taskService.getAllLabel().subscribe(data => {
      this.labelList = data
    })
  }



  getById(id: number) {
    this.doneTask = [];
    this.doingTask = [];

    this.taskService.getById(id).subscribe(value => {
      this.taskSub = value
      console.log(this.taskSub)
      for (let i = 0; i < this.taskSub.length; i++){
        if (this.taskSub[i].progress != 100){
          this.doingTask.push(this.taskSub[i])
        }else
          this.doneTask.push(this.taskSub[i])
      }
    })
  }

  delete(id : number) {
  this.taskService.delete(id).subscribe(data =>{
    this.init()
    console.log(id)
  })

  }

  create() {
    console.log(this.formValue.value)
    console.log(this.labelCreate)
    this.checkTime = false;
    this.formValue.get('label').setValue(this.labelCreate);
    console.log(this.formValue.value)
    if (this.formValue.invalid) {
      alert('There was an error!');
    } else {
      this.taskService.save(this.formValue.value).subscribe(

        () => {
          this.ngOnInit();
        },error => {
          console.log(error)
          console.log(error.error.checkDate)
          var check = error.error.checkDate;
          if(check != null){
            this.checkTime = true;
          }
        }
      );
      let ref = document.getElementById('cancel');
      ref?.click();


    }
    this.labelCreate = [];
  }

  createLabel(label : string) {
    this.taskService.createLabel(label).subscribe(data =>{

    })
  }

  addLabel(label: any){
    this.labelCreate.push(label.value)
    label.value = '';
    }
}
