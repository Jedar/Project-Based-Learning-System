import { Component, OnInit } from '@angular/core';
import {Course} from "../../../share/course.model";
import {CourseService} from "../../../services/course.service";
import {Router} from "@angular/router";
import {NzMessageService, NzModalRef, NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Course[] = [];
  pagination = {
    pageIndex: 1,
  };

  confirmModal?: NzModalRef;

  constructor(
    private courseService : CourseService,
    private router: Router,
    private modal: NzModalService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses(): void {
    this.courseService.getAllTeacherCourses(1)
      .subscribe(result => {
        this.courses = result;
      })
  }

  getIntoCourseProject(courseId: number): void {
    this.router.navigate(['teacher/course']);
  }

  deleteCourse(courseId: number): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '提示',
      nzContent: '确定解散该课程？',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.courseService.deleteCourse(1, courseId)
            .subscribe(result => {
              if (result.state === '') {
                this.message.create('success', '解散课程成功');
              }else {
                this.message.create('error', '解散课程失败，失败原因：' + result.message);
              }
            });
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }
}
