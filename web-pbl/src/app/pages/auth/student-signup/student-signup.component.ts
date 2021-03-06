import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {CommonValidationErrors, CommonValidators} from "../../../share/CommonValidator";
import {AuthService} from '../../../services/auth.service';
import {HttpParams} from "@angular/common/http";
import {Md5} from "ts-md5";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'app-student-signup',
  templateUrl: './student-signup.component.html',
  styleUrls: ['./student-signup.component.css']
})
export class StudentSignupComponent implements OnInit {
  isUnique: any;
  submit = false;
  validateForm!: FormGroup;
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项',
      email: '邮箱格式不正确',
      exists:'用户名已存在',
      agree:'请同意协议'
    },
    en: {
      required: 'Input is required',
      email: 'The input is not valid email',
      exists:'This username already exists',
      agree: 'Please agree our requirement'
    }
  };


  submitForm(): void {
    this.submit = true;
    var formValue = {};
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      formValue[i] = this.validateForm.controls[i].value;
    }
    if (this.validateForm.valid){//所有验证通过开始提交表单
      this.authService.isUniqueUsername(formValue["username"]).subscribe(
        result=> {
            if (result.code!=200){
              this.modal.error({
                nzTitle:"",
                nzContent:result.message
              });
            }else{
              let md5Value = Md5.hashStr(formValue["password"]).toString();
              this.authService.signUp(
                formValue["username"],md5Value,formValue["gender"],formValue["school"], 2
              ).subscribe(
                result=>{
                  if (result.code==200){ //服务器返回注册成功
                    this.modal.success({
                      nzTitle: "",
                      nzContent: "注册成功,请登录"
                    });
                    this.router.navigate(['/auth/student/login']);
                  }else{//服务器返回注册失败
                    this.modal.error({
                      nzTitle: "",
                      nzContent: "注册失败"
                    })
                  }
                },error => {
                  this.modal.error({
                    nzTitle: "",
                    nzContent: "注册失败"
                  })
                });
            }
          },
        error => {
            this.modal.error({
              nzTitle:"注册失败",
              nzContent: "服务器出错"
            })
        });
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
      username: [null, [required,minLengthUsername(4), maxLengthUsername(20)]],
      school: [null, [required, maxLengthUsername(40)]],
      gender:[null, [required]],
      password: [null, [required, minLengthPassword(6), maxLengthPassword(16)]],
      checkPassword: [null, [required, this.confirmationValidator]],
      agree: [false, [this.agreementValidator]]
    });
  }
}

