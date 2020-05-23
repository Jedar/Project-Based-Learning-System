import { Injectable } from '@angular/core';
/* 引入包 */
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
/* 可能用到的操作符 */
import {catchError,map,tap} from 'rxjs/operators';
/* 回调对象 */
import {Observable,of, ObservableInput} from "rxjs";

import {Result, UniqueUsername} from '../share/common.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
const projectUrl = "localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient/* 依赖注入 */
  ) { }
  //登陆
  login(data):Observable<Result>{
    return this.http.get<Result>("/assets/data/login.json").pipe();
  }
  //注册时判断用户名是否已存在
  isUniqueUsername(data):Observable<UniqueUsername>{
    return this.http.get<UniqueUsername>("/assets/data/unique-username.json").pipe();
  }
  //注册
  signUp(data):Observable<Result>{
    return this.http.get<Result>("/assets/data/sign-up.json").pipe()
  }
  checkCode(data):Observable<Result>{
    return this.http.get<Result>("/assets/data/check-code.json").pipe()
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
