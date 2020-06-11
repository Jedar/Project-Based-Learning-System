import { Injectable } from '@angular/core';

/* 引入包 */
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
/* 可能用到的操作符 */
import {catchError,map,tap} from 'rxjs/operators';
/* 回调对象 */
import {Observable,of, ObservableInput} from "rxjs";

import { TaskInfoMessage,EditTaskMessage,TaskMessage,TaskListMessage } from "../share/task.model";

import {ResultMessage} from "../share/common.model";
import { TokenHandler } from '../share/Token';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  allTasksUrl = "/task/all";

  userTaskUrl = "/task/user";

  editMessageUrl = "/task/edit";

  modifyMessageUrl = "/task/update";

  infoUrl = "/task/info/";/* +taskid */

  deleteUrl = "/task/delete/";

  addUrl = "/task/add";

  private projectId:number;

  httpPostOptions = {};
  
  httpOptions = {};

  init(){
    this.httpPostOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'token':new TokenHandler().getToken(),
      })
    };
    
    this.httpOptions = {
      headers: new HttpHeaders({
        'token':new TokenHandler().getToken(),
      })
    };
  }

  constructor(private http:HttpClient/* 依赖注入 */) {
    /* 设置一个默认值 */
    this.projectId = 1;
  }

  getTaskList(projectId:number):Observable<TaskListMessage>{
    this.init();
    let url = this.allTasksUrl+"?projectId="+projectId;
    // return this.http.get<Task[]>("/assets/data/tasks.json").pipe();
    return this.http.get<TaskListMessage>(url,this.httpOptions).pipe();
  }

  getTaskListOfUser(projectId:number,userId:number):Observable<TaskListMessage>{
    this.init();
    // return this.http.get<Task[]>("/assets/data/tasks.json").pipe();
    let url = this.userTaskUrl + "?projectId="+projectId+"&userId="+userId;
    console.log(url);
    return this.http.get<TaskListMessage>(url,this.httpOptions).pipe();
  }

  getTaskOf(taskId:number):Observable<TaskInfoMessage>{
    this.init();
    // return this.http.get<Task>("/assets/data/task_edit.json");
    let url = this.infoUrl+taskId;
    return this.http.get<TaskInfoMessage>(url,this.httpOptions).pipe();
  }

  getTaskMessageOfUser(taskId:number):Observable<TaskInfoMessage>{
    this.init();
    // console.log(taskId);
    // return this.http.get<TaskMessage>("/assets/data/task_modify.json")
    let url = this.infoUrl+taskId;
    return this.http.get<TaskInfoMessage>(url,this.httpOptions).pipe();
  }

  editTaskState(message:EditTaskMessage ):Observable<ResultMessage>{
    this.init();
    // return this.http.get<Result>("/assets/data/success.json").pipe();
    console.log(message);
    let url = this.editMessageUrl;
    return this.http.put<ResultMessage>(url,message,this.httpPostOptions).pipe();
  }

  deleteTask(task_id:number):Observable<ResultMessage>{
    this.init();
    let url = this.deleteUrl+task_id;
    return this.http.delete<ResultMessage>(url,this.httpOptions).pipe();
  }

  addTask(task:TaskMessage):Observable<ResultMessage>{
    this.init();
    let url = this.addUrl;
    return this.http.post<ResultMessage>(url,task,this.httpPostOptions).pipe();
  }

  modifyTask(task:TaskMessage):Observable<ResultMessage>{
    this.init();
    console.log(task);
    let url = this.modifyMessageUrl;
    return this.http.put<ResultMessage>(url,task,this.httpPostOptions).pipe();
  }

  setProjectId(id:number){
    this.projectId = id;
    sessionStorage.setItem("projectId",id+"");
  }

  getProjectId():number{
    this.projectId = Number.parseInt(sessionStorage.getItem("projectId"));
    return this.projectId;
  }
}
