import { Component, OnInit } from '@angular/core';
import {Course} from "../../../share/course.model";
import {CourseService} from "../../../services/course.service";

@Component({
  selector: 'app-course-join',
  templateUrl: './course-join.component.html',
  styleUrls: ['./course-join.component.css']
})
export class CourseJoinComponent implements OnInit {


  searchCoursesResult: Course[] = [];
  searchCoursesPagination = {
    pageIndex: 1
  };

  operation = 1;
  constructor(
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
  }

  searchCourses(): void {
    this.courseService.searchCourse('')
      .subscribe(result => {
        this.searchCoursesResult = result;
      })
  }
}
