import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Participate} from "../share/participate.model";
import {Result} from "../share/common.model";


@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient/* 依赖注入 */) {
  }
  getScores():Observable<Participate[]>{
    return this.http.get<Participate[]>("/assets/data/score.json").pipe();
  }

  submitScore():Observable<Result>{
    return this.http.get<Result>("/assets/data/success.json").pipe();
  }
}
