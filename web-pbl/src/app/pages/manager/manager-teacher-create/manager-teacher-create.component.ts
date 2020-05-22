import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Md5} from "ts-md5";
import {HttpParams} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {CommonValidators} from "../../../share/CommonValidator";

@Component({
  selector: 'app-manager-teacher-create',
  templateUrl: './manager-teacher-create.component.html',
  styleUrls: ['./manager-teacher-create.component.css']
})
export class ManagerTeacherCreateComponent implements OnInit {
  isUnique: any;
  validateForm!: FormGroup;
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项',
      email: '邮箱格式不正确',
      exists:'用户名已存在'
    },
    en: {
      required: 'Input is required',
      email: 'The input is not valid email',
      exists:'This username already exists'
    }
  };


  submitForm(): void {
    var formValue = {};
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      formValue[i] = this.validateForm.controls[i].value;
    }
    if (this.validateForm.valid){//所有验证通过开始提交表单
      let md5Value = Md5.hashStr(formValue["password"]).toString();
      const params = new HttpParams()
        .set("username", formValue["username"])
        .set("school", formValue["school"])
        .set("gender", formValue["gender"])
        .set("password", md5Value);
      //然后把输入框中的内容替换
      // this.validateForm.controls["password"].setValue(md5Value);
      // this.validateForm.controls["checkPassword"].setValue(md5Value);
      this.authService.signUp(params).subscribe(
        result=>{
          if (result.state=="success"){ //服务器返回注册成功
            this.modal.success({
              nzTitle: "",
              nzContent: "创建成功"
            });
            // this.cleanFormValue();
            this.router.navigateByUrl("/manager/teacher_list");
          }else{//服务器返回注册失败
            this.modal.error({
              nzTitle: "",
              nzContent: "创建失败"
            })
          }
        },error => {
          this.modal.error({
            nzTitle: "",
            nzContent: "创建失败"
          })
        });
    }
  }

  cleanFormValue(){
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].setValue("");
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  //判断是否勾选协议
  agreementValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { agree: true };
    }
    return {};
  };

  //判断用户名是否存在
  uniqueUsernameValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else{
      const username = control.value;
      this.authService.isUniqueUsername(username).subscribe(
        result=> {
          this.isUnique = result.result;

        },
        error => {
          console.log(error)
        });
    }
    // TODO:可以把&&后面的去掉
    if (this.isUnique==true && control.value==='111222') {//确认用户名已存在,
      return { exists: true, error: true };
    }
    return {};
  };


  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private modal: NzModalService) {}

  ngOnInit(): void {
    const required = CommonValidators.required;
    const minLengthUsername = CommonValidators.minLengthUsername;
    const minLengthPassword = CommonValidators.minLengthPassword;
    const maxLengthUsername = CommonValidators.maxLengthUsername;
    const maxLengthPassword = CommonValidators.maxLengthPassword;

    this.validateForm = this.fb.group({
      username: [null, [required,minLengthUsername(4), maxLengthUsername(20), this.uniqueUsernameValidator]],
      school: [null, [required, maxLengthUsername(40)]],
      gender:[null, [required]],
      password: [null, [required, minLengthPassword(6), maxLengthPassword(16)]],
      checkPassword: [null, [required, this.confirmationValidator]]
    });
  }
}
