import { Component, OnInit } from '@angular/core';
import {Course} from "../../../share/course.model";
import {CourseService} from "../../../services/course.service";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Course[] = [];
  operation = 0;
  pagination = {
    pageIndex: 1,
  };

  constructor(
    private courseService : CourseService
  ) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses(): void {
    this.courseService.getAllStudentCourses(1)
      .subscribe(result => {
        this.courses = result;
      })
  }
}
