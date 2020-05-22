import {Component, OnInit} from '@angular/core';

import {ProjectService} from "../../../services/project.service";
import {StudentService} from "../../../services/student.service";
import {ActivatedRoute} from "@angular/router";
import {Project} from "../../../share/project.model";
import {Student} from "../../../share/student.model";

@Component({
  selector: 'app-pj-info',
  templateUrl: './pj-info.component.html',
  styleUrls: ['./pj-info.component.css']
})
export class PjInfoComponent implements OnInit {
  projectId: number;
  project: Project = null;
  leader: Student = null;
  student: Student[] = [];

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
  ) {
    activatedRoute.params.subscribe(params => {
      this.projectId = params['projectId'];
    });
  }

  ngOnInit(): void {
    this.projectService.getProjectOf(this.projectId).subscribe(result => {
      this.project = result;
    });

    this.studentService.getStudentInfo().subscribe(result => {
      this.leader = result;
    });

    this.studentService.getStudentsOfProject(this.projectId).subscribe(result=>{
      this.student = result;
    })
  }

}
