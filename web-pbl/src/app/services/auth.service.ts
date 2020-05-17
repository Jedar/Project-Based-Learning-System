import { Injectable } from '@angular/core';
/* 引入包 */
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
/* 可能用到的操作符 */
import {catchError,map,tap} from 'rxjs/operators';
/* 回调对象 */
import {Observable,of, ObservableInput} from "rxjs";

import { User, Restaurant, AuthData} from "../share/auth.model";

import { Result } from '../share/common.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient/* 依赖注入 */
  ) { }

  login(data):Observable<Result>{
    return this.http.get<Result>("/assets/data/login.json").pipe();
  }
}
