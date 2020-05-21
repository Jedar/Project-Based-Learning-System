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
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [ManagerMainComponent, ManagerTeacherComponent, ManagerStudentComponent, ManagerClassComponent, ManagerSystemComponent, ManagerTeacherCreateComponent, ManagerStudentCreateComponent, ManagerClassCreateComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    DemoNgZorroAntdModule,
    AppShareModule,
    FormsModule,
  ]
})
export class ManagerModule { }
