import { Injectable } from '@angular/core';

/* 引入包 */
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
/* 可能用到的操作符 */
import {catchError,map,tap} from 'rxjs/operators';
/* 回调对象 */
import {Observable,of, ObservableInput} from "rxjs";

import { TaskInfoMessage,EditTaskMessage,TaskMessage,TaskListMessage } from "../share/task.model";

import {ResultMessage} from "../share/common.model";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  allTasksUrl = "/task/all";

  userTaskUrl = "/task/user";

  editMessageUrl = "/task/edit";

  modifyMessageUrl = "/task/modify";

  infoUrl = "/task/info/";/* +taskid */

  deleteUrl = "/task/";

  addUrl = "/task";

  private projectId:number;

  constructor(private http:HttpClient/* 依赖注入 */) {
    /* 设置一个默认值 */
    this.projectId = 1;
  }

  getTaskList(projectId:number):Observable<TaskListMessage>{
    let url = this.allTasksUrl+"?projectId="+projectId;
    // return this.http.get<Task[]>("/assets/data/tasks.json").pipe();
    return this.http.get<TaskListMessage>(url).pipe();
  }

  getTaskListOfUser(projectId:number,userId:number):Observable<TaskListMessage>{
    // return this.http.get<Task[]>("/assets/data/tasks.json").pipe();
    let url = this.userTaskUrl + "?projectId="+projectId+"&userId="+userId;
    console.log(url);
    return this.http.get<TaskListMessage>(url).pipe();
  }

  getTaskOf(taskId:number):Observable<TaskInfoMessage>{
    // return this.http.get<Task>("/assets/data/task_edit.json");
    let url = this.infoUrl+taskId;
    return this.http.get<TaskInfoMessage>(url).pipe();
  }

  getTaskMessageOfUser(taskId:number):Observable<TaskMessage>{
    // console.log(taskId);
    // return this.http.get<TaskMessage>("/assets/data/task_modify.json")
    let url = this.infoUrl+taskId;
    return this.http.get<TaskMessage>(url).pipe();
  }

  editTaskState(message:EditTaskMessage ):Observable<ResultMessage>{
    // return this.http.get<Result>("/assets/data/success.json").pipe();
    console.log(message);
    let url = this.editMessageUrl;
    return this.http.put<ResultMessage>(url,message,httpOptions).pipe();
  }

  deleteTask(task_id:number):Observable<ResultMessage>{
    let url = this.deleteUrl+task_id;
    return this.http.delete<ResultMessage>(url).pipe();
  }

  addTask(task:TaskMessage):Observable<ResultMessage>{
    let url = this.addUrl;
    return this.http.post<ResultMessage>(url,task,httpOptions).pipe();
  }

  modifyTask(task:TaskMessage):Observable<ResultMessage>{
    console.log(task);
    let url = this.modifyMessageUrl;
    return this.http.put<ResultMessage>(url,task,httpOptions).pipe();
  }

  setProjectId(id:number){
    this.projectId = id;
  }

  getProjectId():number{
    return this.projectId;
  }
}
