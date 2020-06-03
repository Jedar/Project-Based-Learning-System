import { Injectable } from '@angular/core';

/* 引入包 */
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
/* 可能用到的操作符 */
import {catchError,map,tap} from 'rxjs/operators';
/* 回调对象 */
import {Observable,of, ObservableInput} from "rxjs";

import { Student } from "../share/student.model";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  studentOfProjectUrl = "/project/users";

  constructor(private http:HttpClient/* 依赖注入 */) { }

  getStudentInfo():Observable<Student>{
    return this.http.get<Student>("/assets/data/studentdemo.json").pipe();
  }

  getStudentsOfProject(project_id:number):Observable<Student[]>{
    return this.http.get<Student[]>("/assets/data/students.json").pipe();
  }
}
