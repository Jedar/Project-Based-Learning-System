import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Course, CourseListMessage, TeacherCourseListMessage} from "../share/course.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Result, ResultMessage} from "../share/common.model";
import {TokenHandler} from "../share/Token";


@Injectable({
  providedIn: 'root'
})

export class CourseService {

  httpOptions = {};
  httpGetOptions = {};
  httpFormOptions = {};

  init(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': new TokenHandler().getToken(),
      })
    };

    this.httpGetOptions = {
      headers: new HttpHeaders({
        'token': new TokenHandler().getToken(),
      })
    };

    this.httpFormOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded;charset=utf-8',
        'token': new TokenHandler().getToken(),
      })
    };
  }
  constructor(private http: HttpClient) {
  }

  //得到某个学生已选的所有课程
  getAllStudentCourses(studentId: number): Observable<CourseListMessage> {
    this.init();
    return this.http.get<CourseListMessage>("/course/getStudentCourses/" + studentId, this.httpGetOptions).pipe();
  }

  getAllTeacherCourses(teacherId: number): Observable<TeacherCourseListMessage> {
    this.init();
    return this.http.get<TeacherCourseListMessage>("/course/getTeacherCourses/" + teacherId, this.httpGetOptions).pipe();
  }

  //搜索课程
  searchCourse(searchValue: any): Observable<CourseListMessage> {
    this.init();
    return this.http.get<CourseListMessage>("/course/searchCourse?keyword=" + searchValue, this.httpGetOptions).pipe();
  }

  //学生退出课程
  dropCourse(studentId: number, courseId: number): Observable<ResultMessage> {
    this.init();
    return this.http.delete<ResultMessage>("/course/studentDropCourse?studentId=" + studentId + "&courseId=" + courseId, this.httpGetOptions).pipe();
  }

  //教师解散课程
  deleteCourse(courseId: number): Observable<ResultMessage> {
    this.init();
    return this.http.delete<ResultMessage>("/course/deleteCourse?courseId=" + courseId, this.httpGetOptions).pipe()
  }

  //学生加入课程
  joinCourse(studentId: number, courseId: number): Observable<ResultMessage> {
    this.init();
    return this.http.post<ResultMessage>("/course/studentJoinCourse", {
      studentId: studentId,
      courseId: courseId
    }, this.httpOptions).pipe();
  }

  addCourse(courseName, teacherId, description, maxStudentNumber, picture):Observable<ResultMessage>{
    this.init();
    var params = new HttpParams()
      .set("courseName" ,courseName)
      .set("teacherId" ,teacherId)
      .set("description", description)
      .set("maxStudentNumber", maxStudentNumber)
      .set("picture", picture);
    return this.http.post<ResultMessage>("/course/createCourse", params, this.httpFormOptions).pipe()
  }
}
