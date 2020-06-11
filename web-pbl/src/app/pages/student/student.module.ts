import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentMainComponent } from './student-main/student-main.component';
import {
    NzAvatarModule,
    NzBreadCrumbModule,
    NzButtonModule, NzCardModule, NzDescriptionsModule, NzDropDownModule, NzFormModule, NzGridModule,
    NzIconModule, NzInputModule,
    NzLayoutModule, NzListModule,
    NzMenuModule, NzPaginationModule, NzSelectModule, NzTabsModule,
    NzToolTipModule, NzUploadModule, NzTagModule, NzDividerModule
} from "ng-zorro-antd";
import {AppShareModule} from "../../app-share.module";
import { CourseListComponent } from './course-list/course-list.component';
import { CourseJoinComponent } from './course-join/course-join.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectJoinComponent } from './project-join/project-join.component';
import { InfoComponent } from './info/info.component';
import { ModifyInfoComponent } from './modify-info/modify-info.component';
import { CourseCardComponent } from './course-card/course-card.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CourseMainComponent } from './course-main/course-main.component';
import { CourseInfoComponent } from './course-info/course-info.component';


@NgModule({
  declarations: [StudentMainComponent, CourseListComponent, CourseJoinComponent, ProjectListComponent, ProjectJoinComponent, InfoComponent, ModifyInfoComponent, CourseCardComponent, CourseMainComponent, CourseInfoComponent],
    imports: [
        CommonModule,
        StudentRoutingModule,
        NzLayoutModule,
        AppShareModule,
        NzButtonModule,
        NzToolTipModule,
        NzIconModule,
        NzMenuModule,
        NzBreadCrumbModule,
        NzDropDownModule,
        NzCardModule,
        NzAvatarModule,
        NzGridModule,
        NzPaginationModule,
        NzInputModule,
        NzListModule,
        NzDescriptionsModule,
        NzFormModule,
        ReactiveFormsModule,
        NzUploadModule,
        NzSelectModule,
        FormsModule,
        NzTabsModule,
        NzTagModule,
        NzDividerModule
    ]
})
export class StudentModule { }
