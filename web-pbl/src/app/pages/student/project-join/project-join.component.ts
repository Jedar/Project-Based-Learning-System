import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Project} from "../../../share/project.model";
import {NzMessageService, NzModalRef, NzModalService} from "ng-zorro-antd";
import {ProjectService} from "../../../services/project.service";
import {ProjectListComponent} from "../project-list/project-list.component";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-project-join',
  templateUrl: './project-join.component.html',
  styleUrls: ['./project-join.component.css'],
  inputs: ['courseId']
})
export class ProjectJoinComponent implements OnInit {

  courseId;

  allProjects: Project[] = [];
  pagination = {
    pageIndex: 1,
  };

  confirmModal?: NzModalRef;

  constructor(
    private projectService: ProjectService,
    private modal: NzModalService,
    private message: NzMessageService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects(): void {
    this.projectService.getAllProjects(this.courseId)
      .subscribe(result => {
        if (result.code === 200) {
          this.allProjects = result.data;
        }
      })
  }

  joinProject(projectId: number): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '提示',
      nzContent: '确定加入该项目？(加入后不可退出!)',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.projectService.joinProject(this.authService.getUserId(), projectId)
            .subscribe(result => {
              if (result.code === 200) {
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
