import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TaskService} from "../task.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.css']
})
export class DetailTaskComponent implements OnInit {
  task: any;
  taskSub: any;
  projectList: any;
  p: number;
  formValue: FormGroup;
  subTask: FormGroup;
  taskId: number;
  taskName:String;
  progress: number;
  id: number;
  project:any;
  labelCreate = [];
  parentLabel: Object = [];
  labelList: any;
  projectName: any;
  labelName: any;

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      id: '',
      name: '',
      date: '',
      end: '',
      progress:'',
      project: '',
      label:'',
    })
    this.id = this.activatedRoute.snapshot.params.id;
    this.taskService.finById(this.id).subscribe(value => {
      this.task = value;
      this.projectName = this.task.project;

      this.taskService.getAllLabel().subscribe(data => {
        this.labelList = data;
      })

      this.taskService.findListIdLabel(this.id).subscribe(value1 => {
        this.parentLabel = value1;
        console.log(123)
        console.log(value1)
      })
      console.log(this.task)
      this.formValue.patchValue(this.task);
      this.subTask = this.formBuilder.group({
        id: '',
        name: '',
        date: '',
        end: '',
        progress:'',
        projectId: '',
        label:''
      })
      // this.subTask.get('project').setValue(this.project.name)
    })
    {
      this.taskService.getAllProject().subscribe(data => {
        this.projectList = data
      })



    }

  }

  create() {
    // console.log(this.labelCreate)
    // for(let i = 0; i < this.parentLabel.length; i++){
    //   this.labelCreate.push(this.parentLabel[i].name)
    // }
    // this.subTask.get('label').setValue(this.labelCreate);
    // this.subTask.get('projectId').setValue(this.projectName.id)
    // this.id = this.activatedRoute.snapshot.params.id;
    // console.log(this.id)
    // this.taskService.createSub(this.id,this.subTask.value).subscribe(data=>{
    //   this.taskSub = data;
    //   console.log(this.taskSub)
    //   this.subTask.setValue(this.taskSub);
    // })
  }


  addLabel(label : any){
    this.labelCreate.push(label.value)
    label.value = '';
  }



}
