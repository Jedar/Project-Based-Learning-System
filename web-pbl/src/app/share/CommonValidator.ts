import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import {AuthService} from "../services/auth.service";

// current locale is key of the MyErrorsOptions
export type CommonErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type CommonValidationErrors = Record<string, CommonErrorsOptions>;

export class CommonValidators extends Validators {
  static minLengthUsername(minLength: number): ValidatorFn {
    return (control: AbstractControl): CommonValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      var length = control.value.replace(/[^\x00-\xff]/g, 'xx').length;
      if (length < minLength){
        return {minlength: {'zh-cn': `中文最小长度为${minLength/2}, 英文或字符最小长度为${minLength}`,
            en: `Chinese minLength is ${minLength/2}, English or character minLength is${minLength}`} }
      }
      // if ()

    };
  }

  static maxLengthUsername(maxLength: number): ValidatorFn {
    return (control: AbstractControl): CommonValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      var length = control.value.replace(/[^\x00-\xff]/g, 'xx').length;
      if (length > maxLength){
        return {maxlength: {'zh-cn': `中文最大长度为${maxLength/2}, 英文或字符最大长度为${maxLength}`,
            en: `Chinese maxLength is ${maxLength/2}, English or character maxLength is${maxLength}`} }
      }
    };
  }
  static minLengthPassword(minLength: number): ValidatorFn {
    return (control: AbstractControl): CommonValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      var length = control.value.replace(/[^\x00-\xff]/g, 'xx').length;
      if (length < minLength){
        return {minlength: {'zh-cn': `密码最小长度为${minLength}`,
            en: `Password minLength is${minLength}`} }
      }
      // if ()

    };
  }

  static maxLengthPassword(maxLength: number): ValidatorFn {
    return (control: AbstractControl): CommonValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      var length = control.value.replace(/[^\x00-\xff]/g, 'xx').length;
      if (length > maxLength){
        return {maxlength: {'zh-cn': `密码最大长度为${maxLength}`,
            en: `Password maxLength is${maxLength}`} }
      }
    };
  }

  static mobile(control: AbstractControl): CommonValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isMobile(value) ? null : { mobile: { 'zh-cn': `手机号码格式不正确`, en: `Mobile phone number is not valid` } };
  }

  static max(value:number):ValidatorFn {
    return (control: AbstractControl): CommonValidationErrors | null => {
      if (Validators.max(value)(control) === null) {
        return null;
      }
      return { maxlength: { 'zh-cn': `最大值为 ${value}`, en: `MaxLength is ${value}` } };
    };
  }

  static min(value:number):ValidatorFn {
    return (control: AbstractControl): CommonValidationErrors | null => {
      if (Validators.min(value)(control) === null) {
        return null;
      }
      return { maxlength: { 'zh-cn': `最小值为 ${value}`, en: `MinLength is ${value}` } };
    };
  }
  /*
  * 从后台数据库中获得数据判断用户名是否存在
   */



}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

function isMobile(value: string): boolean {
  return typeof value === 'string' && /(^1\d{10}$)/.test(value);
}
