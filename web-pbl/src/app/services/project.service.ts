import {Injectable} from '@angular/core';

/* 引入包 */
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
/* 可能用到的操作符 */
import {catchError, map, tap} from 'rxjs/operators';
/* 回调对象 */
import {Observable, of, ObservableInput} from "rxjs";

import {Project, ProjectListMessage,ProjectMessage} from '../share/project.model';

import {Result, ResultMessage} from '../share/common.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient/* 依赖注入 */) {
  }

  getProjectOf(project_id: number): Observable<ProjectMessage> {
    let url = "/project/info/"+project_id;
    return this.http.get<ProjectMessage>(url).pipe();
  }

  getAllStudentProjects(studentId: number, courseId: number): Observable<ProjectListMessage> {
    return this.http.get<ProjectListMessage>("/project/getAllStudentProjects?studentId=" + studentId + "&courseId=" + courseId).pipe();
  }


  dropProjectOfStudent(studentId: number, projectId: number): Observable<ResultMessage> {
    return this.http.delete<ResultMessage>("/project/studentDropProject?studentId=" + studentId + "&projectId=" + projectId).pipe();
  }

  getAllProjects(courseId: number): Observable<ProjectListMessage> {
    return this.http.get<ProjectListMessage>("/project/getAllCourseProjects?&courseId=" + courseId).pipe();
  }

  joinProject(studentId: number, projectId: number): Observable<ResultMessage> {
    return this.http.post<ResultMessage>("/project/studentJoinProject", {studentId: studentId, projectId: projectId}).pipe();
  }

  deleteProject(projectId: number): Observable<ResultMessage> {
    var params  = new HttpParams()
      .set("projectId", String(projectId));
    return this.http.delete<ResultMessage>("/project/deleteProject", {params}).pipe()
  }

}
