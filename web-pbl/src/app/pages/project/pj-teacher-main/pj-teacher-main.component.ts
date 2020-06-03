import { Component, OnInit } from '@angular/core';

import { ActivatedRoute,Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';

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
  ) {
    // route.params.subscribe(params => {
    //   this.projectId = Number.parseInt(params['projectId']);
    // });
    this.projectId = taskService.getProjectId();
  }

  ngOnInit(): void {
    let res = this.route;
    
    this.route.parent.url.subscribe(url => {
      res.children[0].url.subscribe(u => {
        this.option = u[0].path;
      });
      
    });
  }

}
