import {Component, OnInit} from '@angular/core';
import {Course} from "../../../share/course.model";
import {CourseService} from "../../../services/course.service";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css'],
  inputs: ['courseId'],
})
export class CourseInfoComponent implements OnInit {

  courseId;
  course: Course;

  constructor(
    private courseService: CourseService,
  ) {
  }

  getCourseInfo(): void {
    this.courseService.getCourseInfo(this.courseId)
      .subscribe(result => {
        if(result.code === 200){
          this.course = result.data;
        }
      })
  }

  ngOnInit(): void {
    this.getCourseInfo();
  }

}
