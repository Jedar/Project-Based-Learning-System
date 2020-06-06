import {Component, OnInit} from '@angular/core';

import {ProjectService} from "../../../services/project.service";
import {StudentService} from "../../../services/student.service";
import {TaskService} from "../../../services/task.service";
import {ActivatedRoute} from "@angular/router";
import {Project} from "../../../share/project.model";
import {Student} from "../../../share/student.model";
import {Task} from 'src/app/share/task.model';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-pj-info',
  templateUrl: './pj-info.component.html',
  styleUrls: ['./pj-info.component.css']
})
export class PjInfoComponent implements OnInit {
  projectId: number;
  project: Project = null;
  leader: Student = null;
  students: Student[] = [];

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private taskService: TaskService,
    private authService: AuthService,
  ) {
    activatedRoute.params.subscribe(params => {
      // this.projectId = params['projectId'];
      this.projectId = taskService.getProjectId();
      console.log(this.projectId);
    });
  }

  ngOnInit(): void {
    this.projectService.getProjectOf(this.projectId).subscribe(result => {
      if (result.code === 200) {
        this.project = result.data;
        this.project.startTime = result.data.startTime.substr(0,10);
        this.project.endTime = result.data.endTime.substr(0,10);

        console.log(this.project.startTime);
      } else {
        window.alert("项目信息获取失败");
      }
      this.studentService.getStudentInfo(result.data.leaderId).subscribe(res => {
        if (res.code == 200) {
          console.log(res.data);
          this.leader = res.data;
        }
        console.log(res.message);
      });

      this.studentService.getStudentsOfProject(this.projectId).subscribe(res => {
        this.students = res.data;
        for (let i=0;i<this.students.length;i++){
          if (this.students[i].sId == result.data.leaderId){
            this.students.splice(i,i+1);
          }
        }
        console.log(this.students);
      })
    });

  }

}
