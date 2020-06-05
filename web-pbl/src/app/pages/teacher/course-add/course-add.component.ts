import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, NzModalService, UploadFile} from "ng-zorro-antd";
import {UploadFileService} from "../../../services/upload-file.service";
import {HttpParams} from "@angular/common/http";
import {CourseService} from "../../../services/course.service";
import {AuthService} from "../../../services/auth.service";
import { retryWhen } from 'rxjs/operators';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {

  validateForm!: FormGroup;
  loading = false;
  avatarUrl?: string;

  teacherId: number;

  constructor(
    private fb: FormBuilder,
    private uploadFileService: UploadFileService,
    private msg: NzMessageService,
    private courseService: CourseService,
    private modal: NzModalService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    let val = this.authService.getUserId();
    if(!val){
      val = 10000;
    }
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      teacher: [val, [Validators.required]],
      description: [null, [Validators.required]],
      maxStudentNumber: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    var formValue = {};
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      formValue[i] = this.validateForm.controls[i].value;
    }
    if(!this.avatarUrl){
      this.msg.error("请上传课程图片");
      return;
    }
    console.log('Form Validate: '+this.validateForm.valid);
    if (this.validateForm.valid&&this.avatarUrl){ //验证通过，则开始验证用户名密码和验证码是否正确
      console.log(this.avatarUrl);
      this.courseService.addCourse(formValue["name"], formValue["teacher"], formValue["description"], formValue["maxStudentNumber"],this.avatarUrl).subscribe(result=>{
        if (result.message=="SUCCESS"){
          this.modal.success({
            nzTitle: "",
            nzContent: "创建成功"
          });
          this.validateForm.reset();
        }else{
          this.modal.error({
            nzTitle: "",
            nzContent: result.message
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
        this.loading = false;
        if(info.file.response.code == 200){
          this.avatarUrl = info.file.response.data;
        }
        else{
          this.avatarUrl = undefined;
          this.msg.error(info.file.response.message);
        }
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

}
