import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListTaskComponent} from './task/list-task/list-task.component';


const routes: Routes = [
  {
    path:'', component: ListTaskComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
