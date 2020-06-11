import { Injectable } from '@angular/core';

/* 引入包 */
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
/* 可能用到的操作符 */
import {catchError,map,tap} from 'rxjs/operators';
/* 回调对象 */
import {Observable,of, ObservableInput} from "rxjs";

import { FileListMessage,FileUpload } from '../share/file.model';

import { ResultMessage } from '../share/common.model';
import { TokenHandler } from '../share/Token';




@Injectable({
  providedIn: 'root'
})
export class FileService {

  fileListUrl = "/file/list";

  deleteUrl = "/file/delete/";/* +id */

  addUrl = "/file/add";

  httpOptions = {};
  httpPostOptions = {};

  init() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'token':new TokenHandler().getToken(),
      })
    };
    
    this.httpPostOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'token':new TokenHandler().getToken(),
      })
    };
  }

  constructor(private http:HttpClient/* 依赖注入 */) {

  }

  getFileList(projectId:number):Observable<FileListMessage>{
    this.init();
    let url = this.fileListUrl+"?projectId="+projectId;
    return this.http.get<FileListMessage>(url,this.httpOptions).pipe();
  }

  deleteFile(fileId:number):Observable<ResultMessage>{
    this.init();
    let url = this.deleteUrl+fileId;
    return this.http.delete<ResultMessage>(url,this.httpOptions).pipe();
    // return this.http.get<Result>("/assets/data/success.json").pipe();
  }

  addFile(file:FileUpload):Observable<ResultMessage>{
    this.init();
    return this.http.post<ResultMessage>(this.addUrl,file,this.httpPostOptions).pipe();
    // return this.http.get<Result>("/assets/data/success.json").pipe();
  }
}
