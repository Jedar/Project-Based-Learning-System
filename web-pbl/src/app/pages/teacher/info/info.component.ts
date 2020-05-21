import { Component, OnInit } from '@angular/core';
import {Teacher} from "../../../share/teacher.model";
import {TeacherService} from "../../../services/teacher.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  teacher: Teacher;

  constructor(
    private teacherService: TeacherService
  ) { }

  ngOnInit(): void {
    this.getTeacherInfo();
  }

  getTeacherInfo(): void {
    this.teacherService.getTeacherInfo()
      .subscribe(result => {
        this.teacher = result;
      })
  }
}
