import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PjStudentMainComponent } from './pj-student-main/pj-student-main.component';
import { PjTeacherMainComponent } from './pj-teacher-main/pj-teacher-main.component';
import { PjInfoComponent } from './pj-info/pj-info.component';
import { PjFileComponent } from './pj-file/pj-file.component';
import { PjDiscussComponent } from './pj-discuss/pj-discuss.component';
import { PjAllTaskComponent } from './pj-all-task/pj-all-task.component';
import { PjMyTaskComponent } from './pj-my-task/pj-my-task.component';
import { PjManageTaskComponent } from './pj-manage-task/pj-manage-task.component';
import { PjMyScoreComponent } from './pj-my-score/pj-my-score.component';
import { PjMarkScoreComponent } from './pj-mark-score/pj-mark-score.component';
import { PjMarkMateComponent } from './pj-mark-mate/pj-mark-mate.component';
import { PjEditTaskComponent } from './pj-edit-task/pj-edit-task.component' ;
import { PjModifyTaskComponent } from './pj-modify-task/pj-modify-task.component' ;
import { PjManageInfoComponent } from './pj-manage-info/pj-manage-info.component' ;


const routes: Routes = [
  {path:'',redirectTo:'404'},
  {path:'teacher',component:PjTeacherMainComponent,children:[
    {path:'info',component:PjInfoComponent},
    {path:'discuss',component:PjDiscussComponent},
    {path:'file',component:PjFileComponent},
    {path:'all_task',component:PjAllTaskComponent},
    {path:'manage_task',component:PjManageTaskComponent},
    {path:'modify_task',component:PjModifyTaskComponent},
    {path:'mark_score',component:PjMarkScoreComponent},
    {path:'setting', component:PjManageInfoComponent},
    {path:'**',redirectTo:'info'}
  ]},
  {path:'student',component:PjStudentMainComponent,children:[
    {path:'info',component:PjInfoComponent},
    {path:'discuss',component:PjDiscussComponent},
    {path:'file',component:PjFileComponent},
    {path:'all_task',component:PjAllTaskComponent},
    {path:'my_task',component:PjMyTaskComponent},
    {path:'manage_task',component:PjManageTaskComponent},
    {path:'modify_task',component:PjModifyTaskComponent},
    {path:'edit_task',component:PjEditTaskComponent},
    {path:'my_score',component:PjMyScoreComponent},
    {path:'mark_mate',component:PjMarkMateComponent},
    {path:'**',redirectTo:'info'}
  ]},
  {path:'**',redirectTo:'404'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
