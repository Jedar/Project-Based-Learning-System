import {Injectable} from '@angular/core';

/* 引入包 */
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
/* 回调对象 */
import {Observable} from "rxjs";

import {DiscussionCountMessage, DiscussionListMessage} from "../share/dicussion.model";
import {StudentMessage} from "../share/student.model";
import {ResultMessage} from "../share/common.model";

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {


  constructor(private http: HttpClient/* 依赖注入 */) {
  }

  getAllDiscussionList(projectId: number): Observable<DiscussionListMessage> {
    projectId = 1;
    const params = new HttpParams({
      fromString: 'projectId=' + projectId
    });

    const findHttpOptions = {
      headers: new HttpHeaders({'content-Type': 'application/json'}),
      params: params
    };
    return this.http.get<DiscussionListMessage>("/discussion/getAllDiscussions", findHttpOptions).pipe();
  }

  getFirstDiscussionList(projectId: number): Observable<DiscussionListMessage> {
    const params = new HttpParams({
      fromString: 'projectId=' + projectId
    });

    const findHttpOptions = {
      headers: new HttpHeaders({'content-Type': 'application/json'}),
      params: params
    };
    return this.http.get<DiscussionListMessage>( "/discussion/list", findHttpOptions).pipe();
  }

  getDiscussionChildren(discussion_id: number): Observable<DiscussionListMessage> {
    const projectId = 1;
    const params = new HttpParams({
      fromString: 'projectId=' + projectId + '&parentsId=' + discussion_id
    });

    const findHttpOptions = {
      headers: new HttpHeaders({'content-Type': 'application/json'}),
      params: params
    };
    return this.http.get<DiscussionListMessage>( "/discussion/children", findHttpOptions).pipe();
  }

  replyDiscussion(data): Observable<ResultMessage> {
    const findHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      })
    };
    return this.http.post<ResultMessage>( "/discussion/add", data, findHttpOptions).pipe();
  }

  getAuthorOfDiscussion(user_id: number): Observable<StudentMessage> {
    const params = new HttpParams({
      fromString: 'studentId=' + user_id
    });

    const findHttpOptions = {
      headers: new HttpHeaders({'content-Type': 'application/json'}),
      params: params
    };
    return this.http.get<StudentMessage>("/discussion/getDiscussionAuthor", findHttpOptions).pipe();

  }

  publishDiscussion(data): Observable<ResultMessage> {
    const findHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      })
    };
    return this.http.post<ResultMessage>( "/discussion/add", data, findHttpOptions).pipe();
  }

  getPublishCount(studentId:number):Observable<DiscussionCountMessage>{
    const params = new HttpParams({
      fromString: 'studentId=' + studentId
    });

    const findHttpOptions = {
      headers: new HttpHeaders({'content-Type': 'application/json'}),
      params: params
    };
    return this.http.get<DiscussionCountMessage>("discussion/getPublishCount",findHttpOptions);
  }

  getReplyCount(studentId:number):Observable<DiscussionCountMessage>{
    const params = new HttpParams({
      fromString: 'studentId=' + studentId
    });

    const findHttpOptions = {
      headers: new HttpHeaders({'content-Type': 'application/json'}),
      params: params
    };
    return this.http.get<DiscussionCountMessage>("discussion/getReplyCount",findHttpOptions);
  }

  updateLike(data):Observable<ResultMessage>{
    const findHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      })
    };

    return this.http.post<ResultMessage>("/discussion/updateLikes",data,findHttpOptions);
  }


}
