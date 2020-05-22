import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';
import { AppShareModule } from '../../app-share.module';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerMainComponent } from './manager-main/manager-main.component';
import { ManagerTeacherComponent } from './manager-teacher/manager-teacher.component';
import { ManagerStudentComponent } from './manager-student/manager-student.component';
import { ManagerClassComponent } from './manager-class/manager-class.component';
import { ManagerSystemComponent } from './manager-system/manager-system.component';
import { ManagerTeacherCreateComponent } from './manager-teacher-create/manager-teacher-create.component';
import { ManagerStudentCreateComponent } from './manager-student-create/manager-student-create.component';
import { ManagerClassCreateComponent } from './manager-class-create/manager-class-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TeacherModule} from "../teacher/teacher.module";
import { ManagerProjectComponent } from './manager-project/manager-project.component';
import { ManagerProjectCreateComponent } from './manager-project-create/manager-project-create.component';


@NgModule({
  declarations: [ManagerMainComponent, ManagerTeacherComponent, ManagerStudentComponent, ManagerClassComponent, ManagerSystemComponent, ManagerTeacherCreateComponent, ManagerStudentCreateComponent, ManagerClassCreateComponent, ManagerProjectComponent, ManagerProjectCreateComponent],
    imports: [
        CommonModule,
        ManagerRoutingModule,
        DemoNgZorroAntdModule,
        AppShareModule,
        FormsModule,
        ReactiveFormsModule,
        TeacherModule,
    ]
})
export class ManagerModule { }
