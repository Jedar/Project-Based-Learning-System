import { Component, OnInit } from '@angular/core';

import { ActivatedRoute,Router } from '@angular/router';
import * as format from 'date-fns/format';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { FormBuilder } from '@angular/forms';
import { CommonValidators } from '../../../share/CommonValidator'

import { TaskMessage } from '../../../share/task.model';
import { TaskService } from '../../../services/task.service';
import { Student } from '../../../share/student.model';
import { StudentService } from '../../../services/student.service';
import { Project } from '../../../share/project.model';
import { ProjectService } from '../../../services/project.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-pj-modify-task',
  templateUrl: './pj-modify-task.component.html',
  styleUrls: ['./pj-modify-task.component.css']
})
export class PjModifyTaskComponent implements OnInit {
  projectId:number;
  taskId:number;
  validateForm;
  students:Student[]=[];
  task:TaskMessage={
    "task_id":0,
    "task_name":"",
    "project_id":0,
    "start_time":"2020-05-20",
    "end_time":"2020-05-20",
    "content":"",
    "user_id":0
  };

  isSubmit:boolean;
  /* 临时的项目信息，实际不会使用，仅仅为了防止空指针 */
  project:Project={
    "projectId":0,
    "courseId":0,
    "projectName":"",
    "theme":"",
    "leaderId":0,
    "startTime":"2020-05-20",
    "endTime":"2020-05-20",
    "description":"",
  };

  startDate:Date;
  endDate:Date;

  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项',
      email: '邮箱格式不正确'
    },
    en: {
      required: 'Input is required',
      email: 'The input is not valid email'
    }
  };

  constructor(
    private router:Router,
    public fb: FormBuilder,
    private taskService:TaskService,
    private modal: NzModalService,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
  ) {
    const { required, maxLength, minLength } = CommonValidators;
    this.validateForm = this.fb.group({
      task_name: [this.task.task_name, [required]],
      user_id:[this.task.user_id, [required]],
      rangePicker: [[this.startDate,this.endDate], [required]],
      content:[this.task.content, [required]]
    });
    activatedRoute.queryParams.subscribe(params => {
      this.projectId = Number.parseInt(params['projectId']);
      this.taskId = Number.parseInt(params['taskId']);
      projectService.getProjectOf(this.projectId).subscribe(result => {
        this.project = result;
        this.startDate = new Date(Date.parse(this.project.startTime));
        this.endDate = new Date(Date.parse(this.project.endTime));
      });
      taskService.getTaskMessageOfUser(this.taskId).subscribe(result => {
        this.task = result;
        this.validateForm.setValue({
          task_name: this.task.task_name,
          user_id:this.task.user_id,
          rangePicker: [this.startDate,this.endDate],
          content:this.task.content
        });
        this.studentService.getStudentsOfProject(this.projectId).subscribe(result=>{
          this.students=result;
        });
      });

    });
  }

  ngOnInit(): void {

  }

  onBack(){
    this.router.navigate(['../','manage_task'],{queryParams:{
      'projectId':this.projectId,
    }});
  }

  submitForm(data){
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    if(!this.validateForm.valid){
      return;
    }
    let date0:Date = data.rangePicker[0];
    let date1:Date = data.rangePicker[0];
    if(!this.isSubmit){
      this.isSubmit = !this.isSubmit;
      this.taskService.modifyTask({
        task_id:this.task.task_id,
        task_name:data.task_name,
        project_id:this.task.project_id,
        user_id:this.task.user_id,
        start_time:format.default(date0, 'yyyy-MM-dd'),
        end_time:format.default(date1,"yyyy-MM-dd"),
        content:data.content,
      }).subscribe(result => {
        this.isSubmit = !this.isSubmit;
        if(result.state=="true"){
          this.modal.success({
            nzTitle: '创建修改',
            nzContent: '任务修改成功',
            nzOnOk:() => {
              this.onBack();
            }
          });
        }
        else{
          this.modal.error({
            nzTitle: '任务修改',
            nzContent: '任务修改失败，请稍后再试',
          });
        }
      })
    }
  }

  onChange(result: Date[]): void {
  }

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.endDate) > 0 || differenceInCalendarDays(current,  this.startDate) < 0;
  };

}
