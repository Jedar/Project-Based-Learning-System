import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UploadFileService} from "../../../services/upload-file.service";
import {NzMessageService, NzModalService, UploadFile} from "ng-zorro-antd";
import {UserOfTeacher} from "../../../share/common.model";
import {ManagerService} from "../../../services/manager.service";
import {CommonValidators} from "../../../share/CommonValidator";
import {HttpParams} from "@angular/common/http";
import {Md5} from "ts-md5";
import {Router} from "@angular/router";
import {Teacher} from "../../../share/teacher.model";

@Component({
  selector: 'app-manager-class-create',
  templateUrl: './manager-class-create.component.html',
  styleUrls: ['./manager-class-create.component.css']
})
export class ManagerClassCreateComponent implements OnInit {

  validateForm!: FormGroup;
  teacherList: Teacher[];
  loading = false;
  avatarUrl?: string;
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
    private uploadFileService: UploadFileService,
    private msg: NzMessageService,
    private managerService: ManagerService,
    private modal: NzModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const required = CommonValidators.required;
    this.validateForm = this.fb.group({
      name: [null, [required]],
      teacher:[null, [required]],
      description: [null, [required]],
      maxStudentNumber: [null, [required]]
    });
    this.managerService.teacherList().subscribe(result=>{
      this.teacherList = result;
    })
  }

  submitForm(): void {
    var formValue = {};
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      formValue[i] = this.validateForm.controls[i].value;
    }
    if (this.validateForm.valid && this.avatarUrl!=undefined){ //验证通过，则开始验证用户名密码和验证码是否正确
      var params = new HttpParams()
        .set("name", formValue["name"])
        .set("teacherName",formValue["teacher"])
        .set("description", formValue["description"])
        .set("maxStudentNumber", formValue["maxStudentNumber"])
        .set("file",this.avatarUrl);
      console.log(params);
      this.managerService.createClass(params).subscribe(result=>{
        if (result.state=="success"){
          this.modal.success({
            nzTitle: "",
            nzContent: "创建成功"
          });
          this.router.navigateByUrl("/manager/class_list");
        }else{
          this.modal.error({
            nzTitle: "",
            nzContent: "创建成功"
          });
          this.cleanFormValue();
        }
      })
    }

  }
  cleanFormValue(){
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].setValue("");
    }
  }

  beforeUpload = this.uploadFileService.beforeUpload;

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.uploadFileService.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }
}
