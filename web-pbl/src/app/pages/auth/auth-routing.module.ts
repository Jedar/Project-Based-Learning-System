import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExampleComponent } from './example/example.component';
import { AuthMainComponent } from './auth-main/auth-main.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StudentSignupComponent } from './student-signup/student-signup.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { ManagerLoginComponent } from './manager-login/manager-login.component';

const routes: Routes = [
  {path: '', component: AuthMainComponent, children:[
    {path:'', redirectTo:'student/login'},
    {path:'example',component: ExampleComponent},
    {path:'student/login', component: StudentLoginComponent},
    {path:'student/signup', component: StudentSignupComponent},
    {path:'teacher/login', component: TeacherLoginComponent},
    {path:'manager/login', component: ManagerLoginComponent},
    {path:'**',redirectTo:'404'}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
