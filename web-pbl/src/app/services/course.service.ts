import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Course, CourseListMessage, TeacherCourseListMessage} from "../share/course.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Result, ResultMessage} from "../share/common.model";
import {TokenHandler} from "../share/Token";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'token': new TokenHandler().getToken(),
  })
};

const httpGetOptions = {
  headers: new HttpHeaders({
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

export class CourseService {

  constructor(private http: HttpClient) {
  }

  //得到某个学生已选的所有课程
  getAllStudentCourses(studentId: number): Observable<CourseListMessage> {
    return this.http.get<CourseListMessage>("/course/getStudentCourses/" + studentId, httpGetOptions).pipe();
  }

  getAllTeacherCourses(teacherId: number): Observable<TeacherCourseListMessage> {
    return this.http.get<TeacherCourseListMessage>("/course/getTeacherCourses/" + teacherId, httpGetOptions).pipe();
  }

  //搜索课程
  searchCourse(searchValue: any): Observable<CourseListMessage> {
    return this.http.get<CourseListMessage>("/course/searchCourse?keyword=" + searchValue, httpGetOptions).pipe();
  }

  //学生退出课程
  dropCourse(studentId: number, courseId: number): Observable<ResultMessage> {
    return this.http.delete<ResultMessage>("/course/studentDropCourse?studentId=" + studentId + "&courseId=" + courseId, httpGetOptions).pipe();
  }

  //教师解散课程
  deleteCourse(courseId: number): Observable<ResultMessage> {
    return this.http.delete<ResultMessage>("/course/deleteCourse?courseId=" + courseId, httpGetOptions).pipe()
  }

  //学生加入课程
  joinCourse(studentId: number, courseId: number): Observable<ResultMessage> {
    return this.http.post<ResultMessage>("/course/studentJoinCourse", {
      studentId: studentId,
      courseId: courseId
    }, httpOptions).pipe();
  }

  addCourse(courseName, teacherId, description, maxStudentNumber, picture):Observable<ResultMessage>{
    var params = new HttpParams()
      .set("courseName" ,courseName)
      .set("teacherId" ,teacherId)
      .set("description", description)
      .set("maxStudentNumber", maxStudentNumber)
      .set("picture", picture);
    return this.http.post<ResultMessage>("/course/createCourse", params, httpFormOptions).pipe()
  }
}
