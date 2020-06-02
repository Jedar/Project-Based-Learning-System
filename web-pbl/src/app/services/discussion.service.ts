import { Injectable } from '@angular/core';

/* 引入包 */
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
/* 回调对象 */
import {Observable} from "rxjs";

import {DiscussionListMessage} from "../share/dicussion.model";
import {StudentMessage} from "../share/student.model";
import {ResultMessage} from "../share/common.model";

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  private serviceUrl = 'http://127.0.0.1:4200';

  constructor(private http:HttpClient/* 依赖注入 */) { }

  getDiscussionList(projectId:number) :Observable<DiscussionListMessage>{
    projectId = 1;
    const params = new HttpParams({
      fromString:'projectId='+projectId
    });

    const findHttpOptions = {
      headers: new HttpHeaders({'content-Type': 'application/json'}),
      params: params
    };
    return this.http.get<DiscussionListMessage>(this.serviceUrl+"/discussion/list",findHttpOptions).pipe();
    // return this.http.get<Discussion[]>("/assets/data/discussions.json").pipe();
  }

  getDiscussionChildren(discussion_id:number):Observable<DiscussionListMessage>{
    const projectId = 1;
    const params = new HttpParams({
      fromString:'projectId='+projectId+'&parentsId='+discussion_id
    });

    const findHttpOptions = {
      headers: new HttpHeaders({'content-Type': 'application/json'}),
      params: params
    };
    return this.http.get<DiscussionListMessage>(this.serviceUrl+"/discussion/children",findHttpOptions).pipe();
  }

  replyDiscussion(data):Observable<ResultMessage>{
    const findHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded;charset=utf-8',
      })
    };
    return this.http.post<ResultMessage>(this.serviceUrl+"/discussion/add",data,findHttpOptions).pipe();
  }

  getAuthorOfDiscussion(user_id:number):Observable<StudentMessage>{
    const params = new HttpParams({
      fromString:'studentId='+user_id
    });

    const findHttpOptions = {
      headers: new HttpHeaders({'content-Type': 'application/json'}),
      params: params
    };
    return this.http.get<StudentMessage>(this.serviceUrl+"/discussion/getDiscussionAuthor",findHttpOptions).pipe();

  }

  publishDiscussion(data):Observable<ResultMessage>{
    const findHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded;charset=utf-8',
      })
    };
    return this.http.post<ResultMessage>(this.serviceUrl+"/discussion/add",data,findHttpOptions).pipe();
}


}
