import {Component, OnInit} from '@angular/core';

import {ProjectService} from "../../../services/project.service";
import {StudentService} from "../../../services/student.service";
import {TaskService} from "../../../services/task.service";
import {ActivatedRoute} from "@angular/router";
import {Project} from "../../../share/project.model";
import {Student} from "../../../share/student.model";
import { Task } from 'src/app/share/task.model';

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
    private taskService: TaskService
  ) {
    activatedRoute.params.subscribe(params => {
      // this.projectId = params['projectId'];
      this.projectId = taskService.getProjectId();
      console.log(this.projectId);
    });
  }

  ngOnInit(): void {
    this.projectService.getProjectOf(this.projectId).subscribe(result => {
      if(result.code === 200){
         this.project = result.data;
         console.log(this.project);
      }
      else{
        window.alert("项目信息获取失败");
      }
     
    });

    this.studentService.getStudentInfo(10009).subscribe(result => {
      this.leader = result.data;
      console.log(result.message);
    });

    this.studentService.getStudentsOfProject(this.projectId).subscribe(result=>{
      this.student = result.data;
      console.log(result.message);
    })
  }

}
