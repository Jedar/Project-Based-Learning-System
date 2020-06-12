import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import {TokenHandler} from "../../../share/Token";
import {AuthService} from "../../../services/auth.service";
import {ProjectService} from "../../../services/project.service";

@Component({
  selector: 'app-pj-student-main',
  templateUrl: './pj-student-main.component.html',
  styleUrls: ['./pj-student-main.component.css']
})
export class PjStudentMainComponent implements OnInit {
  option:string;
  projectId:number;
  isManager:boolean = false;;
  userId:number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService:TaskService,
    private authService: AuthService,
    private projectService:ProjectService,
  ) {
    // route.params.subscribe(params => {
    //   console.log(params);
    //   this.projectId = Number.parseInt(params['projectId']);
    // });
    this.userId = this.authService.getUserId();
    this.projectId = taskService.getProjectId();
    if(!this.projectId){
      this.router.navigate(['/','student']);
    }
    if(!this.userId){
      this.router.navigate(['/','auth']);
    }
    let role = this.authService.getRoleType();
    if(!role || role != 2){
      this.router.navigate(['/','auth','student','login']);
    }
    this.projectService.getProjectOf(this.projectId).subscribe(result => {
      if(result.code === 200){
        this.isManager = (this.userId == result.data.leaderId);
      }
    });
  }

  ngOnInit(): void {
    let res = this.route;

    this.route.parent.url.subscribe(url => {
      res.children[0].url.subscribe(u => {
        this.option = u[0].path;
      });

    });
  }

  logout(){
    this.authService.setUserId(null);
    new TokenHandler().deleteToken();
    this.router.navigateByUrl("/auth/student/login");
  }

}
