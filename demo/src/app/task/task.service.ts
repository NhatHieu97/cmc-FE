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
    return this.http.get(this.baseURL + "/tasks");
  }
  getAllProject(){
    return this.http.get(this.baseURL + "/project");
  }
}
