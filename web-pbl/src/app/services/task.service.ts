import { Injectable } from '@angular/core';

/* 引入包 */
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
/* 可能用到的操作符 */
import {catchError,map,tap} from 'rxjs/operators';
/* 回调对象 */
import {Observable,of, ObservableInput} from "rxjs";

import { Task,EditTaskMessage,TaskMessage,TaskListMessage } from "../share/task.model";

import {Result} from "../share/common.model";

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

  editMessageUrl = "/task/edit/";

  modifyMessageUrl = "/task/modify/";

  editUrl = "/task/edit/";/* +taskid */

  modifyUrl = "/task/modify/";

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

  getTaskListOfUser(projectId:number,userId:number):Observable<Task[]>{
    return this.http.get<Task[]>("/assets/data/tasks.json").pipe();
  }

  getTaskOfUser(taskId:number):Observable<Task>{
    return this.http.get<Task>("/assets/data/task_edit.json")
  }

  getTaskMessageOfUser(taskId:number):Observable<TaskMessage>{
    console.log(taskId);
    return this.http.get<TaskMessage>("/assets/data/task_modify.json")
  }

  editTaskState(message:EditTaskMessage ):Observable<Result>{
    return this.http.get<Result>("/assets/data/success.json").pipe();
  }

  deleteTask(task_id:number):Observable<Result>{
    return this.http.get<Result>("/assets/data/success.json").pipe();
  }

  addTask(task:TaskMessage):Observable<Result>{
    console.log(task);
    return this.http.get<Result>("/assets/data/success.json").pipe();
  }

  modifyTask(task:TaskMessage):Observable<Result>{
    console.log(task);
    return this.http.get<Result>("/assets/data/success.json").pipe();
  }

  setProjectId(id:number){
    this.projectId = id;
  }

  getProjectId():number{
    return this.projectId;
  }
}
