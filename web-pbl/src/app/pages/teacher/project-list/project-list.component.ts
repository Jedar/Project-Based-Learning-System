import { Component, OnInit } from '@angular/core';
import {Project} from "../../../share/project.model";
import {ProjectService} from "../../../services/project.service";
import {Router} from "@angular/router";
import {NzMessageService, NzModalRef, NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [];
  pagination = {
    pageIndex: 1,
  };

  confirmModal?: NzModalRef;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private modal: NzModalService,
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects(): void {
    this.projectService.getAllTeacherProjects(1)
      .subscribe(result => {
        this.projects = result;
      })
  }

  getIntoProject(projectId: number): void {
    this.router.navigate(['project/student'])
  }

  deleteProject(projectId: number): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '提示',
      nzContent: '确定删除该项目？',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.projectService.deleteProject(1, projectId)
            .subscribe(result => {
              if (result.state === '') {
                this.message.create('success', '删除项目成功');
              } else {
                this.message.create('error', '删除项目失败，失败原因：' + result.message);
              }
            });
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }
}
