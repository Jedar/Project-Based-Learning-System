import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ManagerCourse, Result, ResultMessage, User, UserOfStudent, UserOfTeacher} from "../share/common.model";
import {Project, ProjectListMessage} from "../share/project.model";
import {Course, CourseListMessage} from "../share/course.model";
import {Student, StudentListMessage} from "../share/student.model";
import {Teacher, TeacherListMessage} from "../share/teacher.model";
import { TokenHandler } from '../share/Token';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded;charset=utf-8',
    'token':new TokenHandler().getToken(),
  })
};

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) { }

  /*
  **将UTC格式的日期转换成Date类型的string: yyyy-MM-dd
   */
  UTCTODateString(data){
    var year = data.getFullYear();
    var month = data.getMonth() + 1;
    if (month<10)
      month = "0" + month; // 补零
    var day = data.getDate();
    if (day<10)
      day = "0" + day; // 补零
    return year+"-"+month+"-"+day;
  }
  studentList():Observable<StudentListMessage>{
    return this.http.get<StudentListMessage>("/user/studentList",httpOptions).pipe()
  }
  teacherList():Observable<TeacherListMessage>{
    return this.http.get<TeacherListMessage>("/user/teacherList", httpOptions).pipe()
  }
  projectList():Observable<ProjectListMessage>{
    return this.http.get<ProjectListMessage>("/project/projectList").pipe()
  }
  courseList():Observable<CourseListMessage>{
    return this.http.get<CourseListMessage>("/course/courseList").pipe()
  }

  deleteStudent(data):Observable<ResultMessage>{
    var params = new HttpParams()
      .set("studentId", data);
    return this.http.delete<ResultMessage>("/user/deleteStudent", {params}).pipe()
  }
  deleteTeacher(data):Observable<ResultMessage>{
    var params = new HttpParams()
      .set("teacherId", data);
    return this.http.delete<ResultMessage>("/user/deleteTeacher", {params}).pipe()
  }
  deleteProject(data):Observable<ResultMessage>{
    var params  = new HttpParams()
      .set("projectId", data);
    return this.http.delete<ResultMessage>("/project/deleteProject", {params}).pipe()
  }
  deleteClass(data):Observable<ResultMessage>{
    var params  = new HttpParams()
      .set("courseId", data);
    return this.http.delete<ResultMessage>("/course/deleteCourse", {params}).pipe()
  }
  saveTeacherInformation(tId, username, gender, school):Observable<ResultMessage>{
    var params = new HttpParams()
      .set("tId",tId)
      .set("username", username)
      .set("gender", gender)
      .set("school", school);
    return this.http.post<ResultMessage>("/user/modifyTeacherInfo", params, httpOptions).pipe()
  }
  saveStudentInformation(sId, username, gender, school):Observable<ResultMessage>{
    var params = new HttpParams()
      .set("sId",sId)
      .set("username", username)
      .set("gender", gender)
      .set("school", school);
    return this.http.post<ResultMessage>("/user/modifyStudentInfo", params, httpOptions).pipe()
  }
  saveProjectInformation(projectId, courseId, projectName, theme, startTime, endTime):Observable<ResultMessage>{
    var params = new HttpParams()
      .set("projectId", projectId)
      .set("courseId", courseId)
      .set("projectName", projectName)
      .set("theme", theme)
      .set("startTime", startTime)
      .set("endTime", endTime);
    return this.http.post<ResultMessage>("/project/updateProject", params, httpOptions).pipe()
  }
  saveClassInformation(courseId, courseName, description, maxStudentNumber):Observable<ResultMessage>{
    var params = new HttpParams()
      .set("courseId", courseId)
      .set("courseName", courseName)
      .set("description", description)
      .set("maxStudentNumber", maxStudentNumber);
    return this.http.post<ResultMessage>("/course/updateCourse", params, httpOptions).pipe()
  }
  createClass(courseName, teacherName, description, maxStudentNumber, picture):Observable<ResultMessage>{
    var params = new HttpParams()
      .set("courseName" ,courseName)
      .set("teacherName" ,teacherName)
      .set("description", description)
      .set("maxStudentNumber", maxStudentNumber)
      .set("picture", picture);
    return this.http.post<ResultMessage>("/course/createCourse", params, httpOptions).pipe()
  }
  createProject(courseId, projectName, theme, startTime, endTime, value1, value2, value3):Observable<ResultMessage>{
    var params = new HttpParams()
      .set("courseId", courseId)
      .set("projectName" ,projectName)
      .set("theme",theme)
      .set("startTime",startTime)
      .set("endTime",endTime)
      .set("value1",value1)
      .set("value2",value2)
      .set("value3",value3);
    return this.http.post<ResultMessage>("/project/createProject", params, httpOptions).pipe()
  }

}
