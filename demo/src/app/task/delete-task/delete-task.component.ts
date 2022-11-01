import {Component, Inject, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit {
  task: any;
  id :any;


  constructor(
    private taskService: TaskService,
    private dialog: MatDialogRef<DeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.id = this.data.data1;
    this.taskService.finById(this.id).subscribe(data => {
      console.log(data);
      this.task = data['data'];
    });
  }

  submitDelete() {
    this.taskService.deleteTask(this.id).subscribe( () => {
      console.log("Đã xóa được dữ liệu");
      this.dialog.close()
      this.snackBar.open("Đã xóa thành công", '', {
        duration: 2000
      })
    });
  }

}
