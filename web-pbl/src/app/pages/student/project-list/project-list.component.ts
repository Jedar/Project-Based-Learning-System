import {Component, OnInit} from '@angular/core';
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
    private message: NzMessageService
  ) {
  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects(): void {
    this.projectService.getAllStudentProjects(1)
      .subscribe(result => {
        this.projects = result;
      })
  }

  getIntoProject(projectId: number): void {
    this.router.navigate(['project/student'])
  }

  dropProject(projectId: number): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '提示',
      nzContent: '确定退出该项目？',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.projectService.dropProjectOfStudent(1, projectId)
            .subscribe(result => {
              if (result.state === '') {
                this.message.create('success', '退出项目成功');
              } else {
                this.message.create('error', '退出项目失败，失败原因：' + result.message);
              }
            });
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }
}
