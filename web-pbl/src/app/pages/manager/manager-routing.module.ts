import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerMainComponent } from './manager-main/manager-main.component';
import { ManagerTeacherComponent } from './manager-teacher/manager-teacher.component';
import { ManagerStudentComponent } from './manager-student/manager-student.component';
import { ManagerClassComponent } from './manager-class/manager-class.component';
import { ManagerSystemComponent } from './manager-system/manager-system.component';
import { ManagerTeacherCreateComponent } from './manager-teacher-create/manager-teacher-create.component';
import { ManagerStudentCreateComponent } from './manager-student-create/manager-student-create.component';
import { ManagerClassCreateComponent } from './manager-class-create/manager-class-create.component';
import {ManagerProjectCreateComponent} from "./manager-project-create/manager-project-create.component";
import {ManagerProjectComponent} from "./manager-project/manager-project.component";
import {ManagerProjectChartComponent} from "./manager-project-chart/manager-project-chart.component";
import {ManagerClassChartComponent} from "./manager-class-chart/manager-class-chart.component";

const routes: Routes = [
  {path:'', component: ManagerMainComponent, children:[
    {path:'', redirectTo:'teacher_list'},
    {path:'teacher',redirectTo:'teacher_list'},
    {path:'teacher_create',component:ManagerTeacherCreateComponent},
    {path:'teacher_list',component:ManagerTeacherComponent},
    {path:'student',redirectTo:'student_list'},
    {path:'student_create',component:ManagerStudentCreateComponent},
    {path:'student_list',component:ManagerStudentComponent},
    {path:'project',redirectTo:'project_list'},
    {path:'project_create',component:ManagerProjectCreateComponent},
    {path:'project_list',component:ManagerProjectComponent},
    {path:'project_chart',component:ManagerProjectChartComponent},
    {path:'class',redirectTo:'class_list'},
    {path:'class_create',component:ManagerClassCreateComponent},
    {path:'class_list',component:ManagerClassComponent},
    {path:'class_chart',component:ManagerClassChartComponent},
    {path:'system',component:ManagerSystemComponent},
    {path:'**',redirectTo:'404'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
