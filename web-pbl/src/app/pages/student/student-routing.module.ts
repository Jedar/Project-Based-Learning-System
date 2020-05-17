import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentMainComponent} from "./student-main/student-main.component";
import {CourseListComponent} from "./course-list/course-list.component";
import {CourseJoinComponent} from "./course-join/course-join.component";
import {ProjectListComponent} from "./project-list/project-list.component";
import {ProjectJoinComponent} from "./project-join/project-join.component";


const routes: Routes = [
  {path:'', component: StudentMainComponent, children:[
      {path:'', redirectTo:''},
      {path: 'course', redirectTo: 'course_list'},
      {path: 'course_list', component: CourseListComponent},
      {path: 'course_join', component: CourseJoinComponent},
      {path: 'project_list', component: ProjectListComponent},
      {path: 'project_join', component: ProjectJoinComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
