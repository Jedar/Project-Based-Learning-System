import {Component, OnInit} from '@angular/core';
import {Project} from "../../../share/project.model";
import {ProjectService} from "../../../services/project.service";
import {Router} from "@angular/router";
import {NzMessageService, NzModalRef, NzModalService} from "ng-zorro-antd";
import {TaskService} from "../../../services/task.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  inputs: ['courseId']
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
    private taskService: TaskService, 
    ) {
  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects(): void {
    this.projectService.getAllProjects(this.courseId)
      .subscribe(result => {
        this.projects = result.data;
      })
  }

  getIntoProject(projectId: number): void {
    this.taskService.setProjectId(projectId);
    this.router.navigate(['project/teacher']);
  }

  deleteProject(projectId: number): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '提示',
      nzContent: '确定删除该项目？',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.projectService.deleteProject(projectId)
            .subscribe(result => {
              if (result.code === 200) {
                this.message.create('success', '删除项目成功');
                this.getAllProjects();
              } else {
                this.message.create('error', '删除项目失败，失败原因：' + result.message);
              }
            });
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }
}
