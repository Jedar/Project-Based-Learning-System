import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import * as format from 'date-fns/format';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonValidators } from '../../../share/CommonValidator';

import { Task } from '../../../share/task.model';
import { TaskService } from '../../../services/task.service';
import { Student } from '../../../share/student.model';
import { StudentService } from '../../../services/student.service';
import { Project } from '../../../share/project.model';
import { ProjectService } from '../../../services/project.service';
import { AuthService } from '../../../services/auth.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MemoService } from '../../../services/memo.service';
import { Memo,MemoMessage } from '../../../share/memo.model';

import endOfMonth from 'date-fns/endOfMonth';
import { da } from 'date-fns/locale';

@Component({
  selector: 'app-pj-manage-task',
  templateUrl: './pj-manage-task.component.html',
  styleUrls: ['./pj-manage-task.component.css']
})
export class PjManageTaskComponent implements OnInit {
  projectId:number;
  public tasks:Task[] = [];
  validateForm:FormGroup;
  students:Student[]=[];

  isSubmit:boolean;
  isDeleting:boolean;
  isMemo:boolean;
  /* 临时的项目信息，实际不会使用，仅仅为了防止空指针 */
  project:Project={
    "projectId":0,
    "courseId":0,
    "projectName":"",
    "theme":"",
    "leaderId":0,
    "startTime":"2020-05-20",
    "endTime":"2020-05-20",
    "scoreStartTime":"2020-05-20",
    "scoreEndTime":"2020-05-20",
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

  public listOfColumn = [
    {
      title: '任务名称',
    },
    {
      title: '负责人',
      compare: (a: Task, b: Task) => a.username.localeCompare(b.username),
      priority: 1
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
      title: '操作'
    }
  ];

  constructor(
    public fb: FormBuilder,
    private taskService:TaskService,
    private modal: NzModalService,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private router:Router,
    private memoService:MemoService,
    private authService:AuthService,
  ){
    this.projectId = taskService.getProjectId();
    console.log(this.projectId);
    projectService.getProjectOf(this.projectId).subscribe(result => {
      this.project = result.data;
      this.startDate = new Date(Date.parse(this.project.startTime));
      this.endDate = new Date(Date.parse(this.project.endTime));

      var userId = this.authService.getUserId();
      var projectLeaderId = this.project.leaderId;

      let role = this.authService.getRoleType();
      if(!(role === 1 || userId === projectLeaderId)){
        this.router.navigate(['/','401']);
      }
    });
  }

  ngOnInit(): void {

    this.taskService.getTaskList(this.projectId).subscribe(result=>{
      this.tasks = result.data;
    });
    const { required, maxLength, minLength, min, max } = CommonValidators;
    this.validateForm = this.fb.group({
      task_name: [null, [required]],
      user_id:[null, [required]],
      rangePicker: [[], [required]],
      content:[null, [required]],
      priority: [null, [required,min(1),max(5)]]
    });
    this.studentService.getStudentsOfProject(this.projectId).subscribe(result=>{
      if(result.code == 200){
        this.students=result.data;
      }
      else{
        window.alert("项目信息请求错误:"+result.message);
      }

    });
    this.isDeleting =false;
  }

  onDelete(index:number){
    if(this.isDeleting){
      this.modal.info({
        nzTitle:"操作异常",
        nzContent:"删除失败，请稍等片刻后再尝试"
      });
      return;
    }
    this.isDeleting =  true;
    this.taskService.deleteTask(index).subscribe(result=>{
      this.isDeleting =  false;
      if(result.code === 200){
        this.modal.success({
          nzTitle: '删除任务',
          nzContent: '任务删除成功',
          nzOnOk:() => {
            this.tasks = this.tasks.filter((task) => task.task_id != index);
          }
        });
      }
      else{
        this.modal.error({
          nzTitle: '任务删除失败，请稍后再试',
          nzContent: result.message,
        });
      }
    });
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
    if(!this.isSubmit){
      this.isSubmit = true;
      this.taskService.addTask({
        taskId:0,
        taskName:data.task_name,
        projectId:this.projectId,
        userId:data.user_id,
        startTime:format.default(date0, 'yyyy-MM-dd'),
        endTime:format.default(date1,"yyyy-MM-dd"),
        content:data.content,
        state:0,
        comment:"",
        priority:data.priority,
      }).subscribe(result => {
        this.isSubmit = false;
        if(result.code === 200){
          this.modal.success({
            nzTitle: '创建任务',
            nzContent: '任务创建成功',
            nzOnOk:() => {
              this.validateForm.reset();
              this.taskService.getTaskList(this.projectId).subscribe(result=>{
                this.tasks = result.data;
              });
            }
          });
        }
        else{
          this.modal.error({
            nzTitle: '任务创建',
            nzContent: '任务创建失败，请稍后再试。错误信息：'+result.message,
          });
        }
      })
    }
  }

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.endDate) > 0 || differenceInCalendarDays(current,  this.startDate) < 0;
  };

  onMemo(task:number){
    if(this.isMemo){
      return;
    }
    this.isMemo = true;
    this.memoService.addMemo({
      memoId:0,
      read:0,
      sendId:this.authService.getUserId(),
      recvId:0,
      message:'',
      taskId:task
    }).subscribe(result=>{
      if(result.code == 200){
        this.modal.success({
          nzTitle: '提醒',
          nzContent: '提醒成功',
        });
      }
      else{
        window.alert(result.message);
      }
      this.isMemo =false;
    })
  }



}
