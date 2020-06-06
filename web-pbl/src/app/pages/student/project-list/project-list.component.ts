import {Component, OnInit} from '@angular/core';
import {Project} from "../../../share/project.model";
import {ProjectService} from "../../../services/project.service";
import {TaskService} from "../../../services/task.service";
import {Router} from "@angular/router";
import {NzMessageService, NzModalRef, NzModalService} from "ng-zorro-antd";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  inputs: ['courseId'],
})
export class ProjectListComponent implements OnInit {

  courseId;

  projects: Project[] = [];
  pagination = {
    pageIndex: 1,
  };

  confirmModal?: NzModalRef;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private modal: NzModalService,
    private message: NzMessageService,
    private authService: AuthService,
    private taskService: TaskService,
  ) {
  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects(): void {
    this.projectService.getAllStudentProjects(this.authService.getUserId(), this.courseId)
      .subscribe(result => {
        this.projects = result.data;
      })
  }

  getIntoProject(projectId: number): void {
    this.taskService.setProjectId(projectId);
    this.router.navigate(['/project/student'])
  }

  dropProject(projectId: number): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '提示',
      nzContent: '确定退出该项目？',
      nzOnOk: () => {
        this.projectService.dropProjectOfStudent(this.authService.getUserId(), projectId)
            .subscribe(result => {
              if (result.code === 200) {
                this.message.create('success', '退出项目成功');
                this.getAllProjects();
              } else {
                this.message.create('error', '退出项目失败，失败原因：' + result.message);
              }
            });
      }
      // nzOnOk: () =>
      //   new Promise((resolve, reject) => {
      //     this.projectService.dropProjectOfStudent(this.authService.getUserId(), projectId)
      //       .subscribe(result => {
      //         if (result.code === 200) {
      //           this.message.create('success', '退出项目成功');
      //           this.getAllProjects();
      //         } else {
      //           this.message.create('error', '退出项目失败，失败原因：' + result.message);
      //         }
      //       });
      //     setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      //   }).catch(() => console.log('Oops errors!'))
    });
  }
}
