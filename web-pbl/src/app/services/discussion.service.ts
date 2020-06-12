import {Injectable} from '@angular/core';

/* 引入包 */
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
/* 回调对象 */
import {Observable} from "rxjs";

import {DiscussionCountMessage, DiscussionListMessage} from "../share/dicussion.model";
import {StudentMessage} from "../share/student.model";
import {ResultMessage} from "../share/common.model";
import {TokenHandler} from "../share/Token";

const httpGetOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'token': new TokenHandler().getToken(),
  })
};

const httpFormOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded;charset=utf-8',
    'token': new TokenHandler().getToken(),
  })
};

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {


  constructor(private http: HttpClient/* 依赖注入 */) {
  }

  getAllDiscussionList(projectId: number): Observable<DiscussionListMessage> {
    return this.http.get<DiscussionListMessage>("/discussion/getAllDiscussions/"+projectId, httpGetOptions).pipe();
  }

  getFirstDiscussionList(projectId: number): Observable<DiscussionListMessage> {
    return this.http.get<DiscussionListMessage>( "/discussion/list/"+projectId, httpGetOptions).pipe();
  }

  getDiscussionChildren(discussion_id: number,projectId:number): Observable<DiscussionListMessage> {
    return this.http.get<DiscussionListMessage>( "/discussion/children?projectId="+projectId+"&parentsId="+discussion_id, httpGetOptions).pipe();
  }

  replyDiscussion(data): Observable<ResultMessage> {
    return this.http.post<ResultMessage>( "/discussion/add", data, httpFormOptions).pipe();
  }

  getAuthorOfDiscussion(user_id: number): Observable<StudentMessage> {
    return this.http.get<StudentMessage>("/discussion/getDiscussionAuthor/"+user_id, httpGetOptions).pipe();

  }

  publishDiscussion(data): Observable<ResultMessage> {
    return this.http.post<ResultMessage>( "/discussion/add", data, httpFormOptions).pipe();
  }

  getPublishCount(studentId:number):Observable<DiscussionCountMessage>{
    return this.http.get<DiscussionCountMessage>("discussion/getPublishCount/"+studentId,httpGetOptions);
  }

  getReplyCount(studentId:number):Observable<DiscussionCountMessage>{
    return this.http.get<DiscussionCountMessage>("discussion/getReplyCount/"+studentId,httpGetOptions);
  }

  updateLike(data):Observable<ResultMessage>{
    return this.http.post<ResultMessage>("/discussion/updateLikes",data,httpFormOptions);
  }

  getMyDiscussion(projectId:number,studentId:number){
    return this.http.get<DiscussionListMessage>("discussion/getMyDiscussion?projectId="+projectId+"&studentId="+studentId,httpGetOptions);
  }


}
