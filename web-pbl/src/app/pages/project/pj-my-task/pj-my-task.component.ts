import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { TaskService } from '../../../services/task.service';
import { Task } from '../../../share/task.model';
import { AuthService } from '../../../services/auth.service';
import { Student } from '../../../share/student.model';

@Component({
  selector: 'app-pj-my-task',
  templateUrl: './pj-my-task.component.html',
  styleUrls: ['./pj-my-task.component.css']
})
export class PjMyTaskComponent implements OnInit {
  tasks:Task[]=[];
  student:Student=null;
  projectId:number;

  listOfColumn=[
    {
      title: '任务名称',
    },
    {
      title: '开始时间',
      compare: (a: Task, b: Task) => a.start_time.localeCompare(b.start_time),
      priority: 2
    },
    {
      title: '结束时间',
      compare: (a: Task, b: Task) => a.end_time.localeCompare(b.end_time),
      priority: 4
    },
    {
      title: '任务优先级',
      compare: (a: Task, b: Task) => a.priority > b.priority,
      priority: 5
    },
    {
      title: '任务进度',
      compare: (a: Task, b: Task) => a.state - b.state,
      priority: 3
    },
    {
      title: '任务描述',
    },
    {
      title: '操作',
    },
  ]

  constructor(
    private taskService:TaskService,
    private authService:AuthService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.projectId = taskService.getProjectId();
  }

  ngOnInit(): void {
    let userId = this.authService.getUserId();
    this.taskService.getTaskListOfUser(this.projectId,userId).subscribe(res => {
      if(res.code === 200){
        this.tasks = res.data;
      }
      else{
        window.alert(res.message);
      }
    });
  }

}
