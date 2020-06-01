import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ManagerService} from "../../../services/manager.service";
import {Course} from "../../../share/course.model";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {CommonValidators} from "../../../share/CommonValidator";
import {HttpParams} from "@angular/common/http";
import {ManagerCourse} from "../../../share/common.model";

@Component({
  selector: 'app-manager-project-create',
  templateUrl: './manager-project-create.component.html',
  styleUrls: ['./manager-project-create.component.css']
})
export class ManagerProjectCreateComponent implements OnInit {

  courseList: Course[];
  validateForm!: FormGroup;
  range = [30, 70];
  value1 = 30;
  value2 = 40;
  value3 = 30;
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项'
    },
    en: {
      required: 'Input is required'
    }
  };
  constructor(
    private fb: FormBuilder,
    private managerService: ManagerService,
    private modal: NzModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const required = CommonValidators.required;
    this.validateForm = this.fb.group({
      course: [null,[required]],
      name: [null, [required]],
      theme: [null, [required]],
      timeRange: [null, [required]],
      scoreInfo: [[30, 70]]
    });
    this.managerService.courseList().subscribe(result=>{
      this.courseList = result;
    })
  }

  submitForm(): void {
    var formValue = {};
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      formValue[i] = this.validateForm.controls[i].value;
      console.log(formValue[i]);
      console.log(typeof formValue[i])
    }
    if (this.validateForm.valid){
      var start_time = this.managerService.UTCTODateString(formValue["timeRange"][0]);
      var end_time = this.managerService.UTCTODateString(formValue["timeRange"][1]);
      var params = new HttpParams()
        .set("course_id", formValue["course"])
        .set("project_name", formValue["name"])
        .set("theme", formValue["theme"])
        .set("start_time", start_time)  //TODO: 这里传的时间是yyyy-MM-dd 类型的字符串
        .set("end_time", end_time)
        .set("teacher_score", this.value1+"")
        .set("mutual_score", this.value2+"")
        .set("self_score", this.value3+"");
      console.log(params);
      this.managerService.createProject(params).subscribe(result=>{
        if (result.state=="success"){
          this.modal.success({
            nzTitle: "",
            nzContent: "创建成功"
          });
          this.router.navigateByUrl("/manager/project_list");
        }else{
          this.modal.error({
            nzTitle: "",
            nzContent: "创建失败"
          });
          this.cleanFormValue();
        }
      })
    }
  }
  formatter(value: number): string {
    return `${value}%`;
  }
  onRangeChange(): void {
    const scoreInfo = this.validateForm.controls.scoreInfo.value;
    this.value1 = scoreInfo[0];
    this.value2 = scoreInfo[1] - scoreInfo[0];
    this.value3 = 100 - scoreInfo[1];
  }
  cleanFormValue(){
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].setValue("");
    }
  }
}
