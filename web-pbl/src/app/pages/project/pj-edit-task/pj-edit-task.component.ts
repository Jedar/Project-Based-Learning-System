import { Component, OnInit } from '@angular/core';

import { ActivatedRoute,Router } from '@angular/router';

import { TaskService } from '../../../services/task.service';
import { Task } from '../../../share/task.model';
import { CommonValidators } from '../../../share/CommonValidator';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-pj-edit-task',
  templateUrl: './pj-edit-task.component.html',
  styleUrls: ['./pj-edit-task.component.css']
})
export class PjEditTaskComponent implements OnInit {
  projectId:number;
  taskId:number;
  task:Task;
  endTime;
  stateInput:number;
  commentInput:string;
  isSubmit:boolean;
  isOutOfTime:boolean;
  isNotStart:boolean;

  constructor(
    private taskService:TaskService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private modal: NzModalService
  ) {
    activatedRoute.queryParams.subscribe(params => {
      this.projectId = params['projectId'];
      this.taskId = Number.parseInt(params['taskId']);
    });
  }

  ngOnInit(): void {
    this.taskService.getTaskOfUser(this.taskId).subscribe(result => {
      this.task = result;
      this.endTime = Date.parse(this.task.end_time);
      this.isOutOfTime = (Date.now() >= this.endTime);
      this.isNotStart = (Date.now() <= this.endTime);
      this.stateInput = this.task.state;
      this.commentInput = this.task.comment;
    });
  }

  onBack(){
    this.router.navigate(['/','project','student','my_task'],{queryParams:{'projectId':this.projectId}});
  }

  onSubmit(){
    this.isSubmit = true;
    this.taskService.editTaskState({
      'project_id':this.task.project_id,
      'task_id':this.task.task_id,
      'state':this.stateInput,
      'comment':this.commentInput
    }).subscribe(result => {
      if(result.state=="true"){
        this.modal.success({
          nzTitle: '任务编辑',
          nzContent: '任务编辑成功',
          nzOnOk:() => {
            this.onBack();
          }
        });
      }
      else{
        this.modal.error({
          nzTitle: '任务编辑',
          nzContent: '任务编辑失败，请稍后再试',
        });
      }
    })
  }

  formatter(value: number): string {
    return `${value}%`;
  }

}
