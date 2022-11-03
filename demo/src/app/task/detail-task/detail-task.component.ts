import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TaskService} from '../task.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';

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
  taskName: String;
  progress: number;
  id: number;
  checkStart: boolean = false;
  checkEnd: boolean = false;
  project: any

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
      id: '',
      name: '',
      date: '',
      end: '',
      progress: '',
      project: '',
    });
    this.id = this.activatedRoute.snapshot.params.id;
    this.taskService.finById(this.id).subscribe(value => {
      this.task = value['data'];
      // this.task = this.task.task
      this.project = this.task.project
      console.log(this.project.id);
      // this.formValue.patchValue(this.task);
      this.subTask = this.formBuilder.group({
        id: '',
        name: '',
        date: '',
        end: '',
        progress: '',
        projectId: '',
      })
      this.subTask.get('project').setValue(this.project.name)
    });
    {
      this.taskService.getAllProject().subscribe(data => {
        this.projectList = data['data'];
      });


    }

  }

  create() {
    console.log(this.subTask.value);
    this.subTask.get('projectId').setValue(this.project.id)
    this.id = this.activatedRoute.snapshot.params.id;
    this.taskService.createSub(this.id, this.subTask.value).subscribe(data => {
        this.taskSub = data;
        this.subTask.patchValue(this.taskSub);
      let ref = document.getElementById('cancel');
      ref?.click();
      }, error => {
        console.log(error.error);
        var checkStartDate = error.error.start;
        var checkEndDate = error.error.end;
        if (checkStartDate != null) {
          this.checkStart = true;
        }
        if (checkEndDate != null) {
          this.checkEnd = true;
        }
      }
    );
  }
}
