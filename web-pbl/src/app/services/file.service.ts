import { Injectable } from '@angular/core';

/* 引入包 */
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
/* 可能用到的操作符 */
import {catchError,map,tap} from 'rxjs/operators';
/* 回调对象 */
import {Observable,of, ObservableInput} from "rxjs";

import { FileResourse,FileUpload } from '../share/file.model';

import { Result } from '../share/common.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http:HttpClient/* 依赖注入 */) {

  }

  getFileList(projectId:number):Observable<FileResourse[]>{
    return this.http.get<FileResourse[]>("/assets/data/fileList.json").pipe();
  }

  deleteFile(fileId:number):Observable<Result>{
    return this.http.get<Result>("/assets/data/success.json").pipe();
  }

  addFile(file:FileUpload):Observable<Result>{
    return this.http.get<Result>("/assets/data/success.json").pipe();
  }
}
