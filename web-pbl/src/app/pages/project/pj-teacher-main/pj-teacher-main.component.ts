import { Component, OnInit } from '@angular/core';

import { ActivatedRoute,Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import {TokenHandler} from "../../../share/Token";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-pj-teacher-main',
  templateUrl: './pj-teacher-main.component.html',
  styleUrls: ['./pj-teacher-main.component.css']
})
export class PjTeacherMainComponent implements OnInit {
  option:string;
  projectId:number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService:TaskService,
    private authService: AuthService
  ) {
    // route.params.subscribe(params => {
    //   this.projectId = Number.parseInt(params['projectId']);
    // });
    this.projectId = taskService.getProjectId();
  }

  ngOnInit(): void {
    let res = this.route;

    if(!this.authService.getUserId()){
      this.router.navigate(['/','auth']);
    }
    let role = this.authService.getRoleType();
    if(!role || role != 1){
      this.router.navigate(['/','auth','teacher','login']);
    }

    this.route.parent.url.subscribe(url => {
      res.children[0].url.subscribe(u => {
        this.option = u[0].path;
      });
    });
  }

  logout(){
    this.authService.setUserId(null);
    new TokenHandler().deleteToken();
    this.router.navigateByUrl("/auth/teacher/login");
  }
}
