import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, NzModalService, UploadFile} from "ng-zorro-antd";
import {UploadFileService} from "../../../services/upload-file.service";
import {HttpParams} from "@angular/common/http";
import {CourseService} from "../../../services/course.service";
import {AuthService} from "../../../services/auth.service";

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
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      teacher: [this.authService.getUserId(), [Validators.required]],
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
    if (this.validateForm.valid && this.avatarUrl!=undefined){ //验证通过，则开始验证用户名密码和验证码是否正确
      this.courseService.addCourse(formValue["name"], formValue["teacher"], formValue["description"], formValue["maxStudentNumber"],"picture").subscribe(result=>{
        if (result.message=="SUCCESS"){
          this.modal.success({
            nzTitle: "",
            nzContent: "创建成功"
          });
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
