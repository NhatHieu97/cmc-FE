import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Tasks} from './model/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) { }

  private baseURL = 'http://localhost:8080/api/v1';
  private baseURLPro = 'http://localhost:8081/api/v1';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getAll(filter: any){
    if(filter == null){
      return this.http.post(this.baseURL + "/task/listMain/", null);
    }else
      return this.http.post(this.baseURL + "/task/listMain/" , filter);
  }

  getById(id: number) {
    return this.http.get(this.baseURL + "/task/listSub/" + id);
  }

  finById(id: number){
    return this.http.get(this.baseURL + "/task/project/" + id);
  }

  save(taskDto) {
    return this.http.post(this.baseURL + '/task/create', taskDto);
  }

  update(id,taskDto) {
    return this.http.put(this.baseURL + '/task/update/'  + id, taskDto);
  }

  getAllProject(){
    return this.http.get(this.baseURLPro + "/projects");
  }


  createSub(id,taskDto) {
    return this.http.post(this.baseURL + '/task/createSub/'  + id, taskDto);
  }

  deleteTask(id: number){
    return this.http.delete(this.baseURL + "/task/" + id);
  }
  getAllLabel(){
    return this.http.get(this.baseURL + "/label");
  }

  findListIdLabel(id: number){
    console.log(id);
    return this.http.get(this.baseURL + "/label/listLabel/" + id);
  }
}
