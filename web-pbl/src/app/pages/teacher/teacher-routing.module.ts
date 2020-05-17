import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeacherMainComponent} from "./teacher-main/teacher-main.component";
import {CourseListComponent} from "./course-list/course-list.component";
import {CourseAddComponent} from "./course-add/course-add.component";
import {ProjectListComponent} from "./project-list/project-list.component";
import {ProjectAddComponent} from "./project-add/project-add.component";
import {InfoComponent} from "./info/info.component";
import {ModifyInfoComponent} from "./modify-info/modify-info.component";



const routes: Routes = [
  {path: '', component: TeacherMainComponent, children: [
      {path:'', redirectTo:''},
      {path: 'course', redirectTo: 'course_list'},
      {path: 'course_list', component: CourseListComponent},
      {path: 'course_add', component: CourseAddComponent},
      {path: 'project_list', component: ProjectListComponent},
      {path: 'project_add', component: ProjectAddComponent},
      {path: 'info', component: InfoComponent},
      {path: 'modify_info', component: ModifyInfoComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
