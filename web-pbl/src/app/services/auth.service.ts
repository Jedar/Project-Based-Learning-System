import { Injectable } from '@angular/core';
/* 引入包 */
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
/* 可能用到的操作符 */
import {catchError,map,tap} from 'rxjs/operators';
/* 回调对象 */
import {Observable,of, ObservableInput} from "rxjs";

<<<<<<< HEAD
import {Result, UniqueUsername} from '../share/common.model';
=======
import { Result } from '../share/common.model';
>>>>>>> 30f1f9d034b10907f79a1242529dc7c473ed2018

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
}
