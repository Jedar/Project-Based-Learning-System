import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NzMessageService, NzModalRef, NzModalService} from "ng-zorro-antd";
import {CourseService} from "../../../services/course.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

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

  @Output() getAllCourses = new EventEmitter();

  constructor(
    private modal: NzModalService,
    private courseService : CourseService,
    private message: NzMessageService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  getIntoCourseProject(courseId: number): void {
    this.router.navigate(['student/course/' + courseId]);
  }

  dropCourse(courseId: number): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '提示',
      nzContent: '确定退课？',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.courseService.dropCourse(this.authService.getUserId(), courseId)
            .subscribe(result => {
              if (result.code === 200) {
                this.message.create('success', '退课成功');
                this.getAllCourses.emit();

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
      nzOnOk: () => {
        this.courseService.joinCourse(this.authService.getUserId(), courseId)
            .subscribe(result => {
              if (result.code === 200) {
                this.message.create('success', '选课成功');
              }else {
                this.message.create('error', '选课失败，失败原因：' + result.message);
              }
            });
      }
      // nzOnOk: () =>
      //   new Promise((resolve, reject) => {
      //     this.courseService.joinCourse(this.authService.getUserId(), courseId)
      //       .subscribe(result => {
      //         if (result.code === 200) {
      //           this.message.create('success', '选课成功');
      //         }else {
      //           this.message.create('error', '选课失败，失败原因：' + result.message);
      //         }
      //       });
      //     setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      //   }).catch(() => console.log('Oops errors!'))
    });
  }
}
