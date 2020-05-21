import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Course} from "../share/course.model";
import {HttpClient} from "@angular/common/http";
import {Result} from "../share/common.model";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http:HttpClient) { }

  getAllStudentCourses(studentId: number): Observable<Course[]> {
    return this.http.get<Course[]>("/assets/data/courses.json").pipe();
  }

  getAllTeacherCourses(teacherId: number): Observable<Course[]> {
    return this.http.get<Course[]>("/assets/data/courses.json").pipe();
  }

  searchCourse(searchValue: any): Observable<Course[]> {
    return this.http.get<Course[]>("/assets/data/courses.json").pipe();
  }

  //学生退出课程
  dropCourse(studentId: number, courseId: number): Observable<Result> {
    return this.http.get<Result>("").pipe();
  }

  //教师解散课程
  deleteCourse(teacherId: number, courseId: number): Observable<Result> {
    return this.http.get<Result>("").pipe();
  }

  joinCourse(studentId: number, courseId: number): Observable<Result> {
    return this.http.get<Result>("").pipe();
  }
}
