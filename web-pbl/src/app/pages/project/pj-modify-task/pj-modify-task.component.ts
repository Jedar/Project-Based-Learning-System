import { Component, OnInit } from '@angular/core';

import { ActivatedRoute,Router } from '@angular/router';
import * as format from 'date-fns/format';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { FormBuilder } from '@angular/forms';
import { CommonValidators } from '../../../share/CommonValidator'

import { Task } from '../../../share/task.model';
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
  task:Task={
    "task_id":0,
    "task_name":"",
    "project_id":0,
    "start_time":"2020-05-20",
    "end_time":"2020-05-20",
    "content":"",
    "username":"",
    "state":0,
    "comment":"",
    "priority":1
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
    const { required, maxLength, minLength,min,max } = CommonValidators;
    this.validateForm = this.fb.group({
      task_name: [null, [required]],
      user_id:[null, [required]],
      rangePicker: [[], [required]],
      content:[null, [required]],
      priority: [null, [required,min(1),max(5)]]
    });
    activatedRoute.queryParams.subscribe(params => {
      // this.projectId = Number.parseInt(params['projectId']);
      this.projectId = taskService.getProjectId();
      this.taskId = Number.parseInt(params['task_id']);
      projectService.getProjectOf(this.projectId).subscribe(result => {
        if(result.code === 200){
          this.project = result.data;
          this.startDate = new Date(Date.parse(this.project.startTime));
          this.endDate = new Date(Date.parse(this.project.endTime));
        }
        else{
          window.alert("项目信息获取失败");
        }
      });
      this.studentService.getStudentsOfProject(this.projectId).subscribe(result=>{
        this.students=result.data;
      });
      taskService.getTaskMessageOfUser(this.taskId).subscribe(result => {
        if(result.code == 200){
          this.task = result.data;
          console.log(this.task);
          this.validateForm.setValue({
            task_name: this.task.task_name,
            user_id:null,
            rangePicker: [this.task.start_time,this.task.end_time],
            content:this.task.content,
            priority:this.task.priority
          });
        }
        else{
          this.modal.error({
            nzTitle:"请求任务信息错误",
            nzContent:result.message
          })
        }
      });

    });
  }

  ngOnInit(): void {

  }

  onBack(){
    let flag = this.router.url.lastIndexOf("student");
    if(flag == -1){
      this.router.navigate(['/','project','teacher','manage_task'],{queryParams:{
        'projectId':this.projectId,
      }});
    }
    else{
      this.router.navigate(['/','project','student','manage_task'],{queryParams:{
        'projectId':this.projectId,
      }});
    }
    
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
    let date1:Date = data.rangePicker[1];
    if(date0.toString() == date1.toString()){
      this.modal.error({
        nzTitle: '任务修改失败',
        nzContent: '任务起始终止时间不能一样',
      });
      return;
    }
    if(!this.isSubmit){
      this.isSubmit = !this.isSubmit;
      this.taskService.modifyTask({
        taskId:this.task.task_id,
        taskName:data.task_name,
        projectId:this.task.project_id,
        userId:data.user_id,
        startTime:format.default(date0, 'yyyy-MM-dd'),
        endTime:format.default(date1,"yyyy-MM-dd"),
        content:data.content,
        state:0,
        comment:"",
        priority:data.priority
      }).subscribe(result => {
        this.isSubmit = !this.isSubmit;
        if(result.code === 200){
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
