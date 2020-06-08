import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ManagerCourse, Result, ResultMessage, User, UserOfStudent, UserOfTeacher} from "../share/common.model";
import {Project, ProjectListMessage} from "../share/project.model";
import {Course, CourseChartMessage, CourseListMessage, ProjectChartMessage} from "../share/course.model";
import {Student, StudentListMessage} from "../share/student.model";
import {Teacher, TeacherListMessage} from "../share/teacher.model";
import { TokenHandler } from '../share/Token';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  httpOptions = {};

  constructor(private http: HttpClient) { }

  init(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded;charset=utf-8',
        'token':new TokenHandler().getToken(),
      })
    };
  }
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
    this.init();
    return this.http.get<StudentListMessage>("/user/studentList",this.httpOptions).pipe()
  }
  teacherList():Observable<TeacherListMessage>{
    this.init();
    return this.http.get<TeacherListMessage>("/user/teacherList", this.httpOptions).pipe()
  }
  projectList():Observable<ProjectListMessage>{
    this.init();
    return this.http.get<ProjectListMessage>("/project/projectList", this.httpOptions).pipe()
  }
  courseList():Observable<CourseListMessage>{
    this.init();
    return this.http.get<CourseListMessage>("/course/courseList", this.httpOptions).pipe()
  }

  deleteStudent(data):Observable<ResultMessage>{
    this.init();

    return this.http.delete<ResultMessage>("/user/deleteStudent?studentId=" + data, this.httpOptions).pipe()
  }
  deleteTeacher(data):Observable<ResultMessage>{
    this.init();
    return this.http.delete<ResultMessage>("/user/deleteTeacher?teacherId=" + data, this.httpOptions).pipe()
  }
  deleteProject(data):Observable<ResultMessage>{
    this.init();
    return this.http.delete<ResultMessage>("/project/deleteProject?projectId=" + data, this.httpOptions).pipe()
  }
  deleteClass(data):Observable<ResultMessage>{
    this.init();
    var params  = new HttpParams()
      .set("courseId", data);
    return this.http.delete<ResultMessage>("/course/deleteCourse?courseId=" + data, this.httpOptions).pipe()
  }
  saveTeacherInformation(tId, username, gender, school):Observable<ResultMessage>{
    this.init();
    var params = new HttpParams()
      .set("tId",tId)
      .set("username", username)
      .set("gender", gender)
      .set("school", school);
    return this.http.post<ResultMessage>("/user/modifyTeacherInfo", params, this.httpOptions).pipe()
  }
  saveStudentInformation(sId, username, gender, school):Observable<ResultMessage>{
    this.init();
    var params = new HttpParams()
      .set("sId",sId)
      .set("username", username)
      .set("gender", gender)
      .set("school", school);
    return this.http.post<ResultMessage>("/user/modifyStudentInfo", params, this.httpOptions).pipe()
  }
  saveProjectInformation(projectId, courseId, projectName, theme, startTime, endTime):Observable<ResultMessage>{
    this.init();
    var params = new HttpParams()
      .set("projectId", projectId)
      .set("courseId", courseId)
      .set("projectName", projectName)
      .set("theme", theme)
      .set("startTime", startTime)
      .set("endTime", endTime);
    return this.http.post<ResultMessage>("/project/updateProject", params, this.httpOptions).pipe()
  }
  saveClassInformation(courseId, courseName, description, maxStudentNumber):Observable<ResultMessage>{
    this.init();
    var params = new HttpParams()
      .set("courseId", courseId)
      .set("courseName", courseName)
      .set("description", description)
      .set("maxStudentNumber", maxStudentNumber);
    return this.http.post<ResultMessage>("/course/updateCourse", params, this.httpOptions).pipe()
  }
  createClass(courseName, teacherName, description, maxStudentNumber, picture):Observable<ResultMessage>{
    this.init();
    var params = new HttpParams()
      .set("courseName" ,courseName)
      .set("teacherName" ,teacherName)
      .set("description", description)
      .set("maxStudentNumber", maxStudentNumber)
      .set("picture", picture);
    return this.http.post<ResultMessage>("/course/createCourse", params, this.httpOptions).pipe()
  }
  createProject(courseId, projectName, theme, startTime, endTime, value1, value2, value3):Observable<ResultMessage>{
    this.init();
    var params = new HttpParams()
      .set("courseId", courseId)
      .set("projectName" ,projectName)
      .set("theme",theme)
      .set("startTime",startTime)
      .set("endTime",endTime)
      .set("value1",value1)
      .set("value2",value2)
      .set("value3",value3);
    return this.http.post<ResultMessage>("/project/createProject", params, this.httpOptions).pipe()
  }
  getProjectChartMessage():Observable<ProjectChartMessage>{
    this.init();
    return this.http.get<ProjectChartMessage>("/project/projectChart", this.httpOptions);
  }
  getCourseChartMessage():Observable<CourseChartMessage>{
    this.init();
    return this.http.get<CourseChartMessage>("/course/courseChart", this.httpOptions);
  }

}
