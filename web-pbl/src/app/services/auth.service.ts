import { Injectable } from '@angular/core';
/* 引入包 */
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
/* 可能用到的操作符 */
import {catchError,map,tap} from 'rxjs/operators';
/* 回调对象 */
import {Observable,of, ObservableInput} from "rxjs";

import {Result, ResultMessage, UniqueUsername, UserMessage} from '../share/common.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded;charset=utf-8',
  })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId:number;
  constructor(
    private http:HttpClient/* 依赖注入 */
  ) { }
  //登陆
  getUserId(): number{
    return this.userId;
  }
  setUserId(userId: number){
    this.userId = userId;
  }
  login(username, password, role):Observable<UserMessage>{
    const params = new HttpParams()
      .set("username", username)
      .set("password", password)
      .set("role", role);
    return this.http.post<UserMessage>("/user/login", params, httpOptions).pipe();
  }
  //注册时判断用户名是否已存在
  isUniqueUsername(data):Observable<ResultMessage>{
    var params = new HttpParams()
      .set("username", data);
    return this.http.get<ResultMessage>("/user/isUniqueUsername", {params}).pipe();
  }
  //注册
  signUp(username, password, gender, school, role):Observable<ResultMessage>{
    const params = new HttpParams()
      .set("username", username)
      .set("school", school)
      .set("gender", gender)
      .set("password", password)
      .set("role", role);
    return this.http.post<ResultMessage>("/user/signup", params, httpOptions).pipe()
  }
  checkCode(checkCode):Observable<ResultMessage>{
    const params = new HttpParams()
      .set("checkCode", checkCode);
    return this.http.get<ResultMessage>("/checkCode",{params}).pipe()
  }


  // LocalStorage设置数据
  saveUserIdAndPassword(role: string ,userId: string, password: string){
    localStorage.setItem(role+"pbl_userId", userId);
    localStorage.setItem(role+"pbl_password", password)
  }
  // 获取数据   pbl_userId or  pbl_password
  getLocalStorage(role: string, key: string){
    return localStorage.getItem(role + key);
  }
  // 删除数据
  removeAllLocal(role: string){
    localStorage.removeItem(role + "pbl_userId");
    localStorage.removeItem(role + "pbl_password");
  }

  isLocalStorageSupported(): boolean{
    if (window.localStorage){
      return true
    }else{
      return false;
    }
  }
}
