import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Course, CourseListMessage, TeacherCourseListMessage} from "../share/course.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Result, ResultMessage} from "../share/common.model";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded;charset=utf-8',
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
    return this.http.get<CourseListMessage>("/course/getStudentCourses/" + studentId).pipe();
  }

  getAllTeacherCourses(teacherId: number): Observable<TeacherCourseListMessage> {
    return this.http.get<TeacherCourseListMessage>("/course/getTeacherCourses/" + teacherId).pipe();
  }

  //搜索课程
  searchCourse(searchValue: any): Observable<CourseListMessage> {
    return this.http.get<CourseListMessage>("/course/searchCourse?keyword=" + searchValue).pipe();
  }

  //学生退出课程
  dropCourse(studentId: number, courseId: number): Observable<ResultMessage> {
    return this.http.delete<ResultMessage>("/course/studentDropCourse?studentId=" + studentId + "&courseId=" + courseId).pipe();
  }

  //教师解散课程
  deleteCourse(courseId: number): Observable<ResultMessage> {
    var params = new HttpParams()
      .set("courseId", String(courseId));
    return this.http.delete<ResultMessage>("/course/deleteCourse", {params}).pipe()
  }

  //学生加入课程
  joinCourse(studentId: number, courseId: number): Observable<ResultMessage> {
    return this.http.post<ResultMessage>("/course/studentJoinCourse", {
      studentId: studentId,
      courseId: courseId
    }).pipe();
  }

  addCourse(courseName, teacherId, description, maxStudentNumber, picture):Observable<ResultMessage>{
    var params = new HttpParams()
      .set("courseName" ,courseName)
      .set("teacherId" ,teacherId)
      .set("description", description)
      .set("maxStudentNumber", maxStudentNumber)
      .set("picture", picture);
    return this.http.post<ResultMessage>("/course/createCourse", params, httpOptions).pipe()
  }
}
