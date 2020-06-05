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

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'token': new TokenHandler().getToken(),
  })
};

const httpGetOptions = {
  headers: new HttpHeaders({
    'token': new TokenHandler().getToken(),
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient/* 依赖注入 */) {
  }

  getProjectOf(project_id: number): Observable<ProjectMessage> {
    let url = "/project/info/" + project_id;
    return this.http.get<ProjectMessage>(url, httpGetOptions).pipe();
  }

  getAllStudentProjects(studentId: number, courseId: number): Observable<ProjectListMessage> {
    return this.http.get<ProjectListMessage>(
      "/project/getAllStudentProjects?studentId=" + studentId + "&courseId=" + courseId,
      httpGetOptions
    ).pipe();
  }


  dropProjectOfStudent(studentId: number, projectId: number): Observable<ResultMessage> {
    return this.http.delete<ResultMessage>(
      "/project/studentDropProject?studentId=" + studentId + "&projectId=" + projectId,
      httpGetOptions
    ).pipe();
  }

  getAllProjects(courseId: number): Observable<ProjectListMessage> {
    return this.http.get<ProjectListMessage>(
      "/project/getAllCourseProjects?&courseId=" + courseId,
      httpGetOptions
    ).pipe();
  }

  joinProject(studentId: number, projectId: number): Observable<ResultMessage> {
    return this.http.post<ResultMessage>(
      "/project/studentJoinProject", {studentId: studentId, projectId: projectId}, httpOptions).pipe();
  }

  deleteProject(projectId: number): Observable<ResultMessage> {
    return this.http.delete<ResultMessage>("/project/deleteProject?projectId=" + projectId, httpGetOptions).pipe()
  }

}
