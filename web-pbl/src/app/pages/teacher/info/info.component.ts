import { Component, OnInit } from '@angular/core';
import {Teacher} from "../../../share/teacher.model";
import {TeacherService} from "../../../services/teacher.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  teacher: Teacher;

  constructor(
    private teacherService: TeacherService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getTeacherInfo();
  }

  getTeacherInfo(): void {
    this.teacherService.getTeacherInfo(this.authService.getUserId())
      .subscribe(result => {
        this.teacher = result.data;
      })
  }
}
