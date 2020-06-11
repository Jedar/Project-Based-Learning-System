import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ScoreListMessage} from "../share/score.model";
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
export class ScoreService {

  constructor(private http: HttpClient/* 依赖注入 */) {
  }

  getMyScores(studentId: number): Observable<ScoreListMessage> {
    return this.http.get<ScoreListMessage>( "/score/getScores/"+studentId, httpGetOptions).pipe();
  }

  getAllScores():Observable<ScoreListMessage>{
    return this.http.get<ScoreListMessage>( "/score/getAllScores", httpGetOptions).pipe();
  }

  submitScore(data): Observable<ResultMessage> {
    return this.http.post<ResultMessage>( "/score/add", data, httpFormOptions).pipe();
  }
}
