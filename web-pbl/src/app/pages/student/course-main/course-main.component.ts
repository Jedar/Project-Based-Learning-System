import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-course-main',
  templateUrl: './course-main.component.html',
  styleUrls: ['./course-main.component.css']
})
export class CourseMainComponent implements OnInit {

  courseId: number;

  option:string;
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.courseId = parseInt(params.get("courseId"))
    })
  }

}
