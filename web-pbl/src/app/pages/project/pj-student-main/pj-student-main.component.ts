import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import {TokenHandler} from "../../../share/Token";
import {AuthService} from "../../../services/auth.service";
import {ProjectService} from "../../../services/project.service";
import {Project} from "../../../share/project.model";

@Component({
  selector: 'app-pj-student-main',
  templateUrl: './pj-student-main.component.html',
  styleUrls: ['./pj-student-main.component.css']
})
export class PjStudentMainComponent implements OnInit {
  option:string;
  projectId:number;
  isManager:boolean = false;
  userId:number;
  project:Project;
  timeLimit:boolean = false;

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
    this.projectService.getProjectOf(this.projectId).subscribe(result => {
      this.project = result.data;
      let date = new Date();

      let dateStr = date.getFullYear()+"-";
      if(date.getMonth()+1<10){
        dateStr = dateStr +"0" +(date.getMonth()+1);
      }else {dateStr = dateStr + "-" + (date.getMonth()+1);}
      if(date.getDate()<10){
        dateStr = dateStr + "0"+date.getDate();
      }else {dateStr = dateStr + "-"+date.getDate();}

      // console.log(dateStr);
      // console.log(this.project.scoreStartTime,this.project.scoreEndTime,this.project.scoreStartTime<dateStr,this.project.scoreEndTime>dateStr);
      if(this.project.scoreStartTime.substr(0,10) <= dateStr && this.project.scoreEndTime.substr(0,10) >= dateStr){
        this.timeLimit = true;
      }
    });
  }

  logout(){
    this.authService.setUserId(null);
    new TokenHandler().deleteToken();
    this.router.navigateByUrl("/auth/student/login");
  }

}
