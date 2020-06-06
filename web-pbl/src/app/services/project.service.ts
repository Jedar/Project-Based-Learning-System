import {Injectable} from '@angular/core';

/* 引入包 */
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
/* 可能用到的操作符 */
import {catchError, map, tap} from 'rxjs/operators';
/* 回调对象 */
import {Observable, of, ObservableInput} from "rxjs";

import {Project, ProjectListMessage, ProjectMessage} from '../share/project.model';

import {Result, ResultMessage} from '../share/common.model';
import {TokenHandler} from '../share/Token';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  httpOptions = {};
  httpGetOptions = {};

  init() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': new TokenHandler().getToken(),
      })
    };

    this.httpGetOptions = {
      headers: new HttpHeaders({
        'token': new TokenHandler().getToken(),
      })
    };
  }

  constructor(private http: HttpClient/* 依赖注入 */) {
  }

  getProjectOf(project_id: number): Observable<ProjectMessage> {
    this.init();
    let url = "/project/info/" + project_id;
    return this.http.get<ProjectMessage>(url, this.httpGetOptions).pipe();
  }

  getAllStudentProjects(studentId: number, courseId: number): Observable<ProjectListMessage> {
    this.init();
    return this.http.get<ProjectListMessage>(
      "/project/getAllStudentProjects?studentId=" + studentId + "&courseId=" + courseId, this.httpGetOptions).pipe();
  }


  dropProjectOfStudent(studentId: number, projectId: number): Observable<ResultMessage> {
    this.init();
    return this.http.delete<ResultMessage>(
      "/project/studentDropProject?studentId=" + studentId + "&projectId=" + projectId, this.httpGetOptions).pipe();
  }

  getAllProjects(courseId: number): Observable<ProjectListMessage> {
    this.init();
    return this.http.get<ProjectListMessage>(
      "/project/getAllCourseProjects?&courseId=" + courseId, this.httpGetOptions).pipe();
  }

  joinProject(studentId: number, projectId: number): Observable<ResultMessage> {
    this.init();
    return this.http.post<ResultMessage>(
      "/project/studentJoinProject", {studentId: studentId, projectId: projectId}, this.httpOptions).pipe();
  }

  deleteProject(projectId: number): Observable<ResultMessage> {
    this.init();
    return this.http.delete<ResultMessage>("/project/deleteProject?projectId=" + projectId, this.httpGetOptions).pipe()
  }

}
