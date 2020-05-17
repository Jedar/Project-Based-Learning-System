import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';
import { AppShareModule } from '../../app-share.module';

import { ProjectRoutingModule } from './project-routing.module';
import { PjStudentMainComponent } from './pj-student-main/pj-student-main.component';
import { PjTeacherMainComponent } from './pj-teacher-main/pj-teacher-main.component';
import { PjInfoComponent } from './pj-info/pj-info.component';
import { PjFileComponent } from './pj-file/pj-file.component';
import { PjDiscussComponent } from './pj-discuss/pj-discuss.component';
import { PjAllTaskComponent } from './pj-all-task/pj-all-task.component';
import { PjMyTaskComponent } from './pj-my-task/pj-my-task.component';
import { PjManageTaskComponent } from './pj-manage-task/pj-manage-task.component';
import { PjMyScoreComponent } from './pj-my-score/pj-my-score.component';
import { PjMarkScoreComponent } from './pj-mark-score/pj-mark-score.component';
import { PjMarkMateComponent } from './pj-mark-mate/pj-mark-mate.component';


@NgModule({
  declarations: [PjStudentMainComponent, PjTeacherMainComponent, PjInfoComponent, PjFileComponent, PjDiscussComponent, PjAllTaskComponent, PjMyTaskComponent, PjManageTaskComponent, PjMyScoreComponent, PjMarkScoreComponent, PjMarkMateComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    DemoNgZorroAntdModule,
    AppShareModule
  ]
})
export class ProjectModule { }
