import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherMainComponent } from './teacher-main/teacher-main.component';
import {
  NzBreadCrumbModule,
  NzButtonModule, NzCardModule, NzDatePickerModule, NzDescriptionsModule, NzDropDownModule, NzFormModule, NzGridModule,
  NzIconModule, NzInputModule, NzInputNumberModule,
  NzLayoutModule, NzListModule,
  NzMenuModule, NzPaginationModule, NzSelectModule,
  NzToolTipModule, NzUploadModule
} from "ng-zorro-antd";
import {AppShareModule} from "../../app-share.module";
import { CourseListComponent } from './course-list/course-list.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { InfoComponent } from './info/info.component';
import { ModifyInfoComponent } from './modify-info/modify-info.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [TeacherMainComponent, CourseListComponent, CourseAddComponent, ProjectListComponent, ProjectAddComponent, InfoComponent, ModifyInfoComponent],
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
        NzSelectModule
    ]
})
export class TeacherModule { }
