import {Injectable} from '@angular/core';

/* 引入包 */
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
/* 回调对象 */
import {Observable, of, ObservableInput} from "rxjs";

import {Student, StudentMessage} from "../share/student.model";
import {ResultMessage} from "../share/common.model";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded;charset=utf-8',
  })
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient/* 依赖注入 */) {
  }

  getStudentInfo(studentId: number): Observable<StudentMessage> {
    return this.http.get<StudentMessage>("/user/getStudentInfo/" + studentId).pipe();
  }

  modifyStudentInfo(sId, username, password, gender, profile): Observable<ResultMessage> {
    var params = new HttpParams()
      .set("sId" ,sId)
      .set("username", username)
      .set("password" ,password)
      .set("gender", gender)
      .set("profile", profile);

    return this.http.post<ResultMessage>("/user/modifyStudentInfo", params, httpOptions).pipe();
  }

  getStudentsOfProject(project_id: number): Observable<Student[]> {
    return this.http.get<Student[]>("/assets/data/students.json").pipe();
  }
}
