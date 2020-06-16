import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import * as format from 'date-fns/format';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonValidators } from '../../../share/CommonValidator';
import { Student } from '../../../share/student.model';
import { StudentService } from '../../../services/student.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Project,ProjectUpdateInfo,ScoreDistribute } from '../../../share/project.model';
import { ProjectService } from '../../../services/project.service';
import { Task } from '../../../share/task.model';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-pj-manage-info',
  templateUrl: './pj-manage-info.component.html',
  styleUrls: ['./pj-manage-info.component.css']
})
export class PjManageInfoComponent implements OnInit {
  validateForm:FormGroup;
  students:Student[]=[];
  projectId:number;
  isSubmit:boolean;
  project:Project=null;
  distribute:ScoreDistribute;

  val1=0;
  val2=0;
  val3=0;
  total=100;

  formatterPercent = (value: number) => `${value} %`;
  parserPercent = (value: string) => value.replace(' %', '');

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
    public fb: FormBuilder,
    private modal: NzModalService,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private taskService:TaskService,
    private router:Router,
  ) {
    this.projectId = taskService.getProjectId();
    
  }

  ngOnInit(): void {
    const { required, maxLength, minLength, min, max } = CommonValidators;
    this.validateForm = this.fb.group({
      projectName: [null, [required]],
      leaderId:[null, [required]],
      theme:[null, [required]],
      description: [null, [required]],
      rangePicker: [[], [required]],
      rangePickerMark: [[], [required]]
    });
    this.projectService.getProjectOf(this.projectId).subscribe(result => {
      if(result.code == 200){
        this.project = result.data;
        
        this.validateForm.setValue({
          projectName: this.project.projectName,
          leaderId:this.project.leaderId,
          theme:this.project.theme,
          description: this.project.description,
          rangePicker: [new Date(Date.parse(this.project.startTime)),new Date(Date.parse(this.project.endTime))],
          rangePickerMark: [
            new Date(Date.parse(this.project.scoreStartTime)),
            new Date(Date.parse(this.project.scoreEndTime))]
        });
      }
      else{
        window.alert("项目信息请求错误:"+result.message);
      }

    });
    this.studentService.getStudentsOfProject(this.projectId).subscribe(result=>{
      if(result.code == 200){
        this.students=result.data;
      }
      else{
        window.alert("项目信息请求错误:"+result.message);
      }
    });
    this.projectService.getScoreDistribute(this.projectId).subscribe(result=>{
      if(result.code == 200){
        this.distribute = result.data;
        this.val1 = Number.parseInt(this.distribute.value1*100+"");
        this.val2 = Number.parseInt(this.distribute.value2*100+"");
        this.val3 = Number.parseInt(this.distribute.value3*100+"");
        this.total = 100 - this.val1 - this.val2 - this.val3;
      }
      else{
        window.alert("项目信息请求错误:"+result.message);
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
    if(this.total > 0){
      this.modal.info({
        nzTitle: '分数分配错误',
        nzContent: '分数分配错误，请确保分数分配之和为100%',
      });
      return;
    }
    let date0:Date = data.rangePicker[0];
    let date1:Date = data.rangePicker[1];
    let date2:Date = data.rangePickerMark[0];
    let date3:Date = data.rangePickerMark[1];
    if(!this.isSubmit){
      this.isSubmit = true;
      this.projectService.updateProject({
        projectId: this.projectId,
        projectName: data.projectName,
        theme: data.theme,
        leaderId: data.leaderId,
        startTime: format.default(date0, 'yyyy-MM-dd'),
        endTime: format.default(date1, 'yyyy-MM-dd'),
        scoreStartTime: format.default(date2, 'yyyy-MM-dd'),
        scoreEndTime: format.default(date3, 'yyyy-MM-dd'),
        description: data.description,
        value1: this.val1*1.0/100,
        value2: this.val2*1.0/100,
        value3: this.val3*1.0/100,
      }).subscribe(result => {
        if(result.code === 200){
          this.modal.success({
            nzTitle: '修改成功',
            nzContent: '项目信息修改成功',
            nzOnOk:() => {
              this.router.navigate(['/','project','teacher','info']);
            }
          });
        }
        else{
          this.modal.error({
            nzTitle: '修改信息失败',
            nzContent: '修改信息失败，请稍后再试。错误信息：'+result.message,
          });
        }
      })
    }
  }

  increase1(){
    if(this.total > 0){
      this.val1+=1;
      this.total-=1;
    }
    return false;
  }

  decrease1(){
    if(this.val1 > 0){
      this.val1-=1;
      this.total+=1;
    }
    return false;
  }

  increase2(){
    if(this.total > 0){
      this.val2+=1;
      this.total-=1;
    }
    return false;
  }

  decrease2(){
    if(this.val2 > 0){
      this.val2-=1;
      this.total+=1;
    }
    return false;
  }

  increase3(){
    if(this.total > 0){
      this.val3+=1;
      this.total-=1;
    }
    return false;
  }

  decrease3(){
    if(this.val3 > 0){
      this.val3-=1;
      this.total+=1;
    }
    return false;
  }

}
