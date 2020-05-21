import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';

import { CommonValidators } from '../../../share/CommonValidator'

import {AuthService} from '../../../services/auth.service';
import {HttpParams} from "@angular/common/http";
import {Md5} from "ts-md5";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.css']
})
export class ManagerLoginComponent implements OnInit {

  validateForm!: FormGroup;
  checkCodeUrl = "http://localhost:8080/getVerify";
  checkCodePass = false;

  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项',
      checkCode: "验证码错误"
    },
    en: {
      required: 'Input is required',
      checkCode: "checkCode error"
    }
  };

  submitForm(): void {
    var formValue = {};
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      formValue[i] = this.validateForm.controls[i].value;
    }
    if (this.validateForm.valid){ //验证通过，则开始验证用户名密码和验证码是否正确
      const checkCodeParam = new HttpParams().set("checkCode", formValue["checkCode"]);
      console.log(checkCodeParam);
      this.authService.checkCode(checkCodeParam).subscribe(result=>{
        //TODO: 把||后面的部分去掉
        if (result.state!="success"||formValue["checkCode"]=="1234"){
          this.modal.error({
            nzTitle: "",
            nzContent: "验证码错误"
          });
        }else{
          var md5Password = Md5.hashStr(formValue["password"]).toString();
          const params = new HttpParams()
            .set("userID", formValue["userID"])
            .set("password", md5Password);
          console.log(params);
          this.authService.login(params).subscribe(result=>{
              if (result.state=="success"){//登陆成功
                // if (formValue["remember"]){//记住密码
                //
                // }

                this.router.navigate(['/manager']);
              }else{
                this.modal.error({
                  nzTitle: "登陆失败",
                  nzContent: "用户名或密码错误"
                });
              }
            }, error => {
              this.modal.success({
                nzTitle: "登陆失败",
                nzContent: "服务器出错"
              });
            }
          );
        }
      });

    }

  }

  getVerify():void{
    //为url时间戳
    alert("checkcode");
    var getTimestamp = new Date().getTime();
    if (this.checkCodeUrl.indexOf("?") > -1) {
      this.checkCodeUrl = this.checkCodeUrl + "&timestamp=" + getTimestamp
    } else {
      this.checkCodeUrl = this.checkCodeUrl + "?timestamp=" + getTimestamp
    }
    (<HTMLImageElement>document.querySelector("#check-code-img")).src = this.checkCodeUrl;
  }

  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private router: Router,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    // this.getVerify();
    const { required, maxLength, minLength, email, mobile, max, min } = CommonValidators;
    this.validateForm = this.fb.group({
      userID: [null, [required]],
      password: [null, [required]],
      checkCode:[null,[required]],
      remember: [true]
    });
  }

}
