import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentMainComponent } from './student-main/student-main.component';
import {
  NzBreadCrumbModule,
  NzButtonModule,
  NzIconModule,
  NzLayoutModule,
  NzMenuModule,
  NzToolTipModule
} from "ng-zorro-antd";
import {AppShareModule} from "../../app-share.module";
import { CourseListComponent } from './course-list/course-list.component';
import { CourseJoinComponent } from './course-join/course-join.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectJoinComponent } from './project-join/project-join.component';


@NgModule({
  declarations: [StudentMainComponent, CourseListComponent, CourseJoinComponent, ProjectListComponent, ProjectJoinComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    NzLayoutModule,
    AppShareModule,
    NzButtonModule,
    NzToolTipModule,
    NzIconModule,
    NzMenuModule,
    NzBreadCrumbModule
  ]
})
export class StudentModule { }
