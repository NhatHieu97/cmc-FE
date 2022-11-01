import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListTaskComponent} from './task/list-task/list-task.component';
import {DetailTaskComponent} from './task/detail-task/detail-task.component';
import {UpdateTaskComponent} from './task/update-task/update-task.component';


const routes: Routes = [
  {
    path:'', component: ListTaskComponent
  },
  {
    path:"detail/:id",component: DetailTaskComponent
  },
  {
    path:"update/:id",component: UpdateTaskComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
