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

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getAll(){
    return this.http.get(this.baseURL + "/tasks/listMain");
  }

  getById(id: number) {
    return this.http.get(this.baseURL + "/tasks/" + id);
  }

  finById(id: number){
    return this.http.get(this.baseURL + "/tasks/findById/" + id);
  }

  save(taskDto) {
    return this.http.post(this.baseURL + '/tasks/create', taskDto);
  }

  update(id,taskDto) {
    return this.http.put(this.baseURL + '/tasks/update/'  + id, taskDto);
  }

  getAllProject(){
    return this.http.get(this.baseURL + "/project");
  }

  createSub(id,taskDto) {
    console.log(taskDto)
    return this.http.post(this.baseURL + '/tasks/createSub/'  + id, taskDto);
  }

  delete(id: number){
    return this.http.delete(this.baseURL + "/tasks/" + id);
  }

  createLabel(label) {
    return this.http.post(this.baseURL + '/label/create', label);
  }

  getAllLabel(){
    return this.http.get(this.baseURL + "/label/list");
  }

  finByIdLabel(id: number){
    return this.http.get(this.baseURL + "/label/findById/" + id);
  }

  findListIdLabel(id: number){
    return this.http.get(this.baseURL + "/label/idLabel/" + id);
  }
}
