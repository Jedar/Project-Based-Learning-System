import { Component, OnInit } from '@angular/core';
import {TeacherCourse} from "../../../share/course.model";
import {CourseService} from "../../../services/course.service";
import {Router} from "@angular/router";
import {NzMessageService, NzModalRef, NzModalService} from "ng-zorro-antd";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: TeacherCourse[] = [];
  pagination = {
    pageIndex: 1,
  };

  confirmModal?: NzModalRef;

  constructor(
    private courseService : CourseService,
    private router: Router,
    private modal: NzModalService,
    private message: NzMessageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses(): void {
    this.courseService.getAllTeacherCourses(this.authService.getUserId())
      .subscribe(result => {
        this.courses = result.data;
      })
  }

  getIntoCourseProject(courseId: number): void {
    this.router.navigate(['teacher/course/' + courseId]);
  }

  deleteCourse(courseId: number): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '提示',
      nzContent: '确定解散该课程？',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.courseService.deleteCourse(courseId)
            .subscribe(result => {
              if (result.code === 200) {
                this.message.create('success', '解散课程成功');
                this.getAllCourses();
              }else {
                this.message.create('error', '解散课程失败，失败原因：' + result.message);
              }
            });
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }
}
