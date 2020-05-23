import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherMainComponent } from './teacher-main/teacher-main.component';
import {
  NzBreadCrumbModule,
  NzButtonModule,
  NzCardModule,
  NzDatePickerModule,
  NzDescriptionsModule,
  NzDropDownModule,
  NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzInputNumberModule,
  NzLayoutModule,
  NzListModule,
  NzMenuModule,
  NzPaginationModule,
  NzSelectModule, NzSliderModule, NzSwitchModule,
  NzTabsModule,
  NzToolTipModule,
  NzUploadModule
} from "ng-zorro-antd";
import {AppShareModule} from "../../app-share.module";
import { CourseListComponent } from './course-list/course-list.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { InfoComponent } from './info/info.component';
import { ModifyInfoComponent } from './modify-info/modify-info.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CourseMainComponent } from './course-main/course-main.component';
import { CourseInfoComponent } from './course-info/course-info.component';


@NgModule({
    declarations: [TeacherMainComponent, CourseListComponent, CourseAddComponent, ProjectListComponent, ProjectAddComponent, InfoComponent, ModifyInfoComponent, CourseMainComponent, CourseInfoComponent],
    exports: [
        CourseAddComponent
    ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    NzLayoutModule,
    AppShareModule,
    NzButtonModule,
    NzToolTipModule,
    NzIconModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzDropDownModule,
    NzGridModule,
    NzCardModule,
    NzPaginationModule,
    ReactiveFormsModule,
    NzInputModule,
    NzFormModule,
    NzUploadModule,
    NzInputNumberModule,
    NzListModule,
    NzDatePickerModule,
    NzDescriptionsModule,
    NzSelectModule,
    NzTabsModule,
    NzSwitchModule,
    FormsModule,
    NzSliderModule
  ]
})
export class TeacherModule { }
