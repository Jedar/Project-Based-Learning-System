import { Component, OnInit } from '@angular/core';

import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {CommonValidators} from "../../../share/CommonValidator";
import {AuthService} from '../../../services/auth.service';
import {HttpParams} from "@angular/common/http";
import {Md5} from "ts-md5";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {TokenHandler} from "../../../share/Token";

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {
  imgSrc;
  localUserID;
  localPassword;
  isRemember = false;
  validateForm!: FormGroup;
  checkCodeUrl = "/getVerify";
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
      // const checkCodeParam = new HttpParams().set("checkCode", formValue["checkCode"]);
      // console.log(checkCodeParam);
      this.authService.checkCode(formValue["checkCode"]).subscribe(result=>{
        if (result.code!=200){
          this.modal.error({
            nzTitle: "",
            nzContent: "验证码错误"
          });
        }else{
          var md5Password;
          if (this.isRemember&&formValue["password"]==this.localPassword)  //如果本地记住密码且用户没有作出修改
            md5Password = this.localPassword;
          else
            md5Password = Md5.hashStr(formValue["password"]).toString();
          // const params = new HttpParams()
          //   .set("userID", formValue["userID"])
          //   .set("password", md5Password);
          // console.log(params);
          this.authService.login(formValue["userID"],md5Password, 2).subscribe(result=>{
              if (result.code==200){//登陆成功
                new TokenHandler().setToken(result.message);
                if (formValue["remember"]){ //用户选择记住密码
                  this.authService.saveUserIdAndPassword("student",formValue["userID"], md5Password);
                }else{
                  this.authService.removeAllLocal("student");
                }
                this.authService.setUserId(result.data.userId);
                this.router.navigate(['/student']);
              }else{
                this.modal.error({
                  nzTitle: "登陆失败",
                  nzContent: result.message
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
    var getTimestamp = new Date().getTime();
    if (this.checkCodeUrl.indexOf("?") > -1) {
      this.checkCodeUrl = this.checkCodeUrl + "&timestamp=" + getTimestamp
    } else {
      this.checkCodeUrl = this.checkCodeUrl + "?timestamp=" + getTimestamp
    }
    this.imgSrc = this.checkCodeUrl;
  }

  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private router: Router,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.localUserID = this.authService.getLocalStorage("student","pbl_userId");
    this.localPassword = this.authService.getLocalStorage("student","pbl_password");
    if (this.authService.isLocalStorageSupported()){//浏览器支持localStorage
      if (this.localUserID!=null&&this.localPassword!=null){//用户名密码存在
        this.isRemember = true;
      }
    }
    const { required, maxLength, minLength, email, mobile, max, min } = CommonValidators;
    this.validateForm = this.fb.group({
      userID: [null, [required]],
      password: [null, [required]],
      checkCode:[null,[required]],
      remember: [this.isRemember]
    });
    this.validateForm.controls["userID"].setValue(this.localUserID);
    this.validateForm.controls["password"].setValue(this.localPassword);
    this.getVerify();
  }
}
