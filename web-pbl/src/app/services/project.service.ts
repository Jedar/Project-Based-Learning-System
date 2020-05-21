import { Injectable } from '@angular/core';

/* 引入包 */
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
/* 可能用到的操作符 */
import {catchError,map,tap} from 'rxjs/operators';
/* 回调对象 */
import {Observable,of, ObservableInput} from "rxjs";

import { Project } from '../share/project.model';

import { Result } from '../share/common.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient/* 依赖注入 */) { }

  getProjectOf(project_id:number):Observable<Project>{
    return this.http.get<Project>("/assets/data/project.json").pipe();
  }
}
