import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Teacher} from "../share/teacher.model";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(
    private http:HttpClient
  ) { }

  getTeacherInfo():Observable<Teacher>{
    return this.http.get<Teacher>("/assets/data/teacherdemo.json").pipe();
  }
}
