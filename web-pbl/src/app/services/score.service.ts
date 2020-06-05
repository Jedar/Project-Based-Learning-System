import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ScoreListMessage} from "../share/score.model";
import {ResultMessage} from "../share/common.model";
import {StudentListMessage} from "../share/student.model";


@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private serviceUrl = 'http://127.0.0.1:4200';

  constructor(private http: HttpClient/* 依赖注入 */) {
  }

  getScores(studentId: number): Observable<ScoreListMessage> {
    const params = new HttpParams({
      fromString: 'studentId=' + studentId
    });

    const findHttpOptions = {
      headers: new HttpHeaders({'content-Type': 'application/json'}),
      params: params
    };
    return this.http.get<ScoreListMessage>(this.serviceUrl + "/score/getScores", findHttpOptions).pipe();

  }

  submitScore(data): Observable<ResultMessage> {
    const findHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      })
    };
    return this.http.post<ResultMessage>(this.serviceUrl + "/score/add", data, findHttpOptions).pipe();
  }
}
