import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';

import { CommonValidators } from '../../../share/CommonValidator'

import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {

  validateForm;

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

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.authService.login({}).subscribe(result=>{
      window.alert(result.message);
    });
  }

  constructor(
    private fb: FormBuilder,
    private authService:AuthService
    ) {}

  ngOnInit(): void {
    const { required, maxLength, minLength, email, mobile, max, min } = CommonValidators;
    this.validateForm = this.fb.group({
      userName: [null, [required,minLength(6),maxLength(20)]],
      password: [null, [required]],
      remember: [true]
    });
  }

}
