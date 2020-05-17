import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ExampleComponent } from './example/example.component';
import { AuthMainComponent } from './auth-main/auth-main.component';
import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';
import { AppShareModule } from '../../app-share.module';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StudentSignupComponent } from './student-signup/student-signup.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { ManagerLoginComponent } from './manager-login/manager-login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ExampleComponent, 
    AuthMainComponent, StudentLoginComponent, StudentSignupComponent, TeacherLoginComponent, ManagerLoginComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    DemoNgZorroAntdModule,
    AppShareModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
