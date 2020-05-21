import { Component, OnInit } from '@angular/core';
import {Project} from "../../../share/project.model";
import {NzMessageService, NzModalRef, NzModalService} from "ng-zorro-antd";
import {ProjectService} from "../../../services/project.service";

@Component({
  selector: 'app-project-join',
  templateUrl: './project-join.component.html',
  styleUrls: ['./project-join.component.css']
})
export class ProjectJoinComponent implements OnInit {

  allProjects: Project[] = [];
  pagination = {
    pageIndex: 1,
  };

  confirmModal?: NzModalRef;

  constructor(
    private projectService: ProjectService,
    private modal: NzModalService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects(): void {
    this.projectService.getAllProjects(1)
      .subscribe(result => {
        this.allProjects = result;
      })
  }

  joinProject(projectId: number): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '提示',
      nzContent: '确定加入该项目？',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.projectService.joinProject(1, projectId)
            .subscribe(result => {
              if (result.state === '') {
                this.message.create('success', '加入项目成功');
              } else {
                this.message.create('error', '加入项目失败，失败原因：' + result.message);
              }
            });
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }
}
