import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ManagerCourse, Result, User, UserOfStudent, UserOfTeacher} from "../share/common.model";
import {Project} from "../share/project.model";
import {Course} from "../share/course.model";

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
  studentList():Observable<UserOfStudent[]>{
    return this.http.get<UserOfStudent[]>("/assets/data/student-list.json").pipe()
  }
  teacherList():Observable<UserOfTeacher[]>{
    return this.http.get<UserOfTeacher[]>("/assets/data/teacher-list.json").pipe()
  }
  projectList():Observable<Project[]>{
    return this.http.get<Project[]>("/assets/data/projects.json").pipe()
  }
  courseList():Observable<ManagerCourse[]>{
    return this.http.get<ManagerCourse[]>("/assets/data/manager-course.json").pipe()
  }

  deleteStudent(data):Observable<Result>{
    return this.http.get<Result>("/assets/data/delete-student.json").pipe()
  }
  deleteTeacher(data):Observable<Result>{
    return this.http.get<Result>("/assets/data/delete-teacher.json").pipe()
  }
  deleteProject(data):Observable<Result>{
    return this.http.get<Result>("/assets/data/delete-student.json").pipe()
  }
  deleteClass(data):Observable<Result>{
    return this.http.get<Result>("/assets/data/delete-teacher.json").pipe()
  }
  saveTeacherInformation(data):Observable<Result>{
    return this.http.get<Result>("/assets/data/edit-teacher.json").pipe()
  }
  saveStudentInformation(data):Observable<Result>{
    return this.http.get<Result>("/assets/data/edit-student.json").pipe()
  }
  saveProjectInformation(data):Observable<Result>{
    return this.http.get<Result>("/assets/data/edit-teacher.json").pipe()
  }
  saveClassInformation(data):Observable<Result>{
    return this.http.get<Result>("/assets/data/edit-student.json").pipe()
  }
  createClass(data):Observable<Result>{
    return this.http.get<Result>("/assets/data/manager-create-class.json").pipe()
  }
  createProject(data):Observable<Result>{
    return this.http.get<Result>("/assets/data/manager-create-project.json").pipe()
  }

}
