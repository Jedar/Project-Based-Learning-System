import { Component, OnInit } from '@angular/core';
import {Student} from "../../../share/student.model";
import {StudentService} from "../../../services/student.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  student: Student;

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.getStudentInfo();
  }

  getStudentInfo(): void {
    this.studentService.getStudentInfo()
      .subscribe(result => {
        this.student = result;
      })
  }
}
