import { Injectable } from '@angular/core';

/* 引入包 */
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
/* 可能用到的操作符 */
import {catchError,map,tap} from 'rxjs/operators';
/* 回调对象 */
import {Observable,of, ObservableInput} from "rxjs";

import { FileListMessage,FileUpload } from '../share/file.model';

import { ResultMessage } from '../share/common.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class FileService {

  fileListUrl = "/file/list";

  deleteUrl = "/file/delete/";/* +id */

  addUrl = "/file/add";

  constructor(private http:HttpClient/* 依赖注入 */) {

  }

  getFileList(projectId:number):Observable<FileListMessage>{
    let url = this.fileListUrl;
    return this.http.get<FileListMessage>(url).pipe();
  }

  deleteFile(fileId:number):Observable<ResultMessage>{
    let url = this.deleteUrl+fileId;
    return this.http.delete<ResultMessage>(url).pipe();
    // return this.http.get<Result>("/assets/data/success.json").pipe();
  }

  addFile(file:FileUpload):Observable<ResultMessage>{
    return this.http.post<ResultMessage>(this.addUrl,file,httpOptions).pipe();
    // return this.http.get<Result>("/assets/data/success.json").pipe();
  }
}
