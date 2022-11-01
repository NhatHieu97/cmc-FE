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
      project: [''],
    })
    this.taskService.getAllProject().subscribe(data => {
      this.projectList = data['data']
      this.id = this.activatedRoute.snapshot.params.id;
      this.taskService.finById(this.id).subscribe(value => {
        this.task = value['data'];
        this.formValue.patchValue(this.task);
      })
    })
  }

  update() {
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
}
