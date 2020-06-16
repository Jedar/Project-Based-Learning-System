import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StudentMainComponent} from "./student-main/student-main.component";
import {CourseListComponent} from "./course-list/course-list.component";
import {CourseJoinComponent} from "./course-join/course-join.component";
import {InfoComponent} from "./info/info.component";
import {ModifyInfoComponent} from "./modify-info/modify-info.component";
import {CourseMainComponent} from "./course-main/course-main.component";
import {MemoListComponent} from './memo-list/memo-list.component';


const routes: Routes = [
  {path:'', component: StudentMainComponent, children:[
      {path:'', redirectTo:'course_list'},
      {path: 'course', redirectTo: 'course_list'},
      {path: 'course_list', component: CourseListComponent},
      {path: 'course_join', component: CourseJoinComponent},
      {path: 'info', component: InfoComponent},
      {path: 'modify_info', component: ModifyInfoComponent},
      {path: 'course/:courseId', component: CourseMainComponent},
      {path: 'memo', component: MemoListComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
