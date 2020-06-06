import {Injectable} from '@angular/core';

/* 引入包 */
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
/* 回调对象 */
import {Observable, of, ObservableInput} from "rxjs";

import {Student, StudentListMessage , StudentMessage} from "../share/student.model";
import {ResultMessage} from "../share/common.model";
import { TokenHandler } from '../share/Token';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  studentOfProjectUrl = "/student/project";

  httpOptions = {};
  httpGetOptions = {};

  init(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded;charset=utf-8',
        'token': new TokenHandler().getToken(),
      })
    };

    this.httpGetOptions = {
      headers: new HttpHeaders({
        'token': new TokenHandler().getToken(),
      })
    };
  }

  constructor(private http:HttpClient/* 依赖注入 */) { }

  getStudentInfo(studentId: number): Observable<StudentMessage> {
    this.init();
    return this.http.get<StudentMessage>("/user/getStudentInfo/" + studentId, this.httpGetOptions).pipe();
  }

  modifyStudentInfo(sId, username, password, gender, profile): Observable<ResultMessage> {
    this.init();
    var params = new HttpParams()
      .set("sId" ,sId)
      .set("username", username)
      .set("password" ,password)
      .set("gender", gender)
      .set("profile", profile);

    return this.http.post<ResultMessage>("/user/modifyStudentInfo", params, this.httpOptions).pipe();
  }

  getStudentsOfProject(project_id:number):Observable<StudentListMessage>{
    this.init();
    let url = this.studentOfProjectUrl + "?projectId="+project_id;
    return this.http.get<StudentListMessage>(url,this.httpGetOptions).pipe();
    // return this.http.get<Student[]>("/assets/data/students.json").pipe();
  }
}
