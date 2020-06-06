import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Teacher, TeacherMessage} from "../share/teacher.model";
import {ResultMessage} from "../share/common.model";
import {TokenHandler} from "../share/Token";


@Injectable({
  providedIn: 'root'
})
export class TeacherService {

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

  constructor(private http: HttpClient) {}


  getTeacherInfo(teacherId: number): Observable<TeacherMessage> {
    this.init();
    return this.http.get<TeacherMessage>("/user/getTeacherInfo/" + teacherId, this.httpGetOptions).pipe();
  }

  modifyTeacherInfo(tId, username, password, gender, profile): Observable<ResultMessage> {
    this.init();
    var params = new HttpParams()
      .set("tId" ,tId)
      .set("username", username)
      .set("password" ,password)
      .set("gender", gender)
      .set("profile", profile);

    return this.http.post<ResultMessage>("/user/modifyTeacherInfo", params, this.httpOptions).pipe();
  }
}
