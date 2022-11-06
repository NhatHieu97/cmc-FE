import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TaskService} from "../task.service";
import {logger} from "codelyzer/util/logger";

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  task: any;
  taskSub: any;
  projectList: any;
  p: number;
  formValue: FormGroup;
  taskId: number;
  taskName: String;
  progress: number;
  id: number;
  labelCreate = [];
  parentLabel: Object=[];
  labelList: any;
  project: any;
  labelAfterDelete = [];

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      id: [''],
      name: [''],
      date: [''],
      end: [''],
      progress: [''],
      projectId: [''],
      labels: [''],
    })
    this.taskService.getAllProject().subscribe(data => {
      this.projectList = data['data']
      console.log("project")
      console.log(this.projectList)
      this.id = this.activatedRoute.snapshot.params.id;
      this.taskService.finById(this.id).subscribe(value => {
        this.task = value['data'];
        console.log(this.task)
        this.project = this.task.project
        this.taskService.findListIdLabel(this.id).subscribe(data=> {
          this.parentLabel = data['data'];
          console.log(123)
          console.log(this.parentLabel)
          this.formValue.patchValue(this.task.task)
          // this.formValue.get('projectId').setValue(this.project)
          console.log(this.formValue.value)
        })
      })
    })
  }

  update() {
    console.log(this.formValue.value)
    this.changeLabel();
    this.formValue.get('labels').setValue(this.labelCreate);
    console.log(this.formValue.value)
    if (this.formValue.invalid) {
      alert('There was an error!');
    } else {
      this.taskService.update( this.formValue.value.id ,this.formValue.value).subscribe(
        () => {
          this.router.navigateByUrl('').then(r => {
            console.log("suscess");});
        }
      );
    }

  }

  addLabel(label : any){
    this.labelCreate.push(label.value);
    label.value = '';
  }

  deletelabel(label: any) {
    this.labelAfterDelete = [];
    for (let i = 0; i < this.parentLabel.length; i++){
      if (this.parentLabel[i].name != label){
        this.labelAfterDelete.push(this.parentLabel[i])
      }
    }
    this.parentLabel = this.labelAfterDelete;
  }

  deleteAfterAdd(label: any) {
    this.labelAfterDelete = [];
    for (let i = 0; i < this.labelCreate.length; i++){
      if (this.labelCreate[i] != label){
        this.labelAfterDelete.push(this.labelCreate[i])
      }
    }
    this.labelCreate = this.labelAfterDelete;
    console.log(this.parentLabel)
  }

  changeLabel(){
    for(let i = 0; i < this.parentLabel.length; i++){
      this.labelCreate.push(this.parentLabel[i].name)
    }
  }
}
