import { Injectable } from '@angular/core';
/* 引入包 */
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
/* 可能用到的操作符 */
import {catchError,map,tap} from 'rxjs/operators';
/* 回调对象 */
import {Observable,of, ObservableInput} from "rxjs";
import {ResultMessage} from '../share/common.model';
import {Memo,MemoResult,MemoMessage, MemoCount} from '../share/memo.model';
import { TokenHandler } from '../share/Token';
import { init } from 'echarts';

@Injectable({
    providedIn: 'root'
})
export class MemoService {
    httpOptions = {};
  
    constructor(private http: HttpClient) { }

    init(){
        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'token':new TokenHandler().getToken(),
          })
        };
    }

    memoList(userId:number):Observable<MemoResult>{
        this.init();
        return this.http.get<MemoResult>("/memo/list/"+userId,this.httpOptions).pipe();
    }

    memoCount(userId:number):Observable<MemoCount>{
        this.init();
        return this.http.get<MemoCount>("/memo/count/"+userId,this.httpOptions).pipe();
    }

    addMemo(memo:Memo):Observable<ResultMessage>{
        this.init();
        return this.http.post<ResultMessage>("/memo/add",memo,this.httpOptions).pipe();
    }

    deleteMemo(memo:number):Observable<ResultMessage>{
        this.init();
        return this.http.delete<ResultMessage>("/memo/"+memo,this.httpOptions).pipe();
    }

    readMemo(memo:number):Observable<ResultMessage>{
        this.init();
        return this.http.put<ResultMessage>("/memo/read/"+memo,{},this.httpOptions).pipe();
    }
}

