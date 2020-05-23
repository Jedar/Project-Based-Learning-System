import { Component, OnInit } from '@angular/core';
import {NzMessageService, NzModalRef, NzModalService} from "ng-zorro-antd";
import {CourseService} from "../../../services/course.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
  inputs: ['course', 'operation'],
})
export class CourseCardComponent implements OnInit {

  course;
  operation;

  confirmModal?: NzModalRef;

  constructor(
    private modal: NzModalService,
    private courseService : CourseService,
    private message: NzMessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  getIntoCourseProject(courseId: number): void {
    this.router.navigate(['student/course']);
  }

  dropCourse(courseId: number): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '提示',
      nzContent: '确定退课？',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.courseService.dropCourse(1, courseId)
            .subscribe(result => {
              if (result.state === '') {
                this.message.create('success', '退课成功');
              }else {
                this.message.create('error', '退课失败，失败原因：' + result.message);
              }
            });
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }

  joinCourse(courseId: number): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '提示',
      nzContent: '确定加入该课程？',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.courseService.joinCourse(1, courseId)
            .subscribe(result => {
              if (result.state === '') {
                this.message.create('success', '选课成功');
              }else {
                this.message.create('error', '选课失败，失败原因：' + result.message);
              }
            });
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }
}
