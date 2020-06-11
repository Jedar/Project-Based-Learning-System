import { Component, OnInit } from '@angular/core';
import {Student} from "../../../share/student.model";
import {StudentService} from "../../../services/student.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  student: Student;

  constructor(
    private studentService: StudentService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getStudentInfo();
  }

  getStudentInfo(): void {
    console.log(this.authService.getUserId());

    this.studentService.getStudentInfo(this.authService.getUserId())
      .subscribe(result => {
        if(result.code === 200){
          this.student = result.data;
        }
      })
  }
}
