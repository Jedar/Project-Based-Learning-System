import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Result, User, UserOfStudent, UserOfTeacher} from "../share/common.model";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) { }

  studentList():Observable<UserOfStudent[]>{
    return this.http.get<UserOfStudent[]>("/assets/data/student-list.json").pipe()
  }
  teacherList():Observable<UserOfTeacher[]>{
    return this.http.get<UserOfTeacher[]>("/assets/data/teacher-list.json").pipe()
  }
  deleteStudent(data):Observable<Result>{
    return this.http.get<Result>("/assets/data/delete-student.json").pipe()
  }
  deleteTeacher(data):Observable<Result>{
    return this.http.get<Result>("/assets/data/delete-teacher.json").pipe()
  }
  saveTeacherInformation(data):Observable<Result>{
    return this.http.get<Result>("/assets/data/edit-teacher.json").pipe()
  }
  saveStudentInformation(data):Observable<Result>{
    return this.http.get<Result>("/assets/data/edit-student.json").pipe()
  }
}
