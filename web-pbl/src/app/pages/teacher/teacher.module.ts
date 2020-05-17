import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherMainComponent } from './teacher-main/teacher-main.component';
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
import { CourseAddComponent } from './course-add/course-add.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectAddComponent } from './project-add/project-add.component';


@NgModule({
  declarations: [TeacherMainComponent, CourseListComponent, CourseAddComponent, ProjectListComponent, ProjectAddComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    NzLayoutModule,
    AppShareModule,
    NzButtonModule,
    NzToolTipModule,
    NzIconModule,
    NzMenuModule,
    NzBreadCrumbModule
  ]
})
export class TeacherModule { }
