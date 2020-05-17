import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

// current locale is key of the MyErrorsOptions
export type CommonErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type CommonValidationErrors = Record<string, CommonErrorsOptions>;

export class CommonValidators extends Validators {
  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): CommonValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return { minlength: { 'zh-cn': `最小长度为 ${minLength}`, en: `MinLength is ${minLength}` } };
    };
  }

  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): CommonValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return { maxlength: { 'zh-cn': `最大长度为 ${maxLength}`, en: `MaxLength is ${maxLength}` } };
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


}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

function isMobile(value: string): boolean {
  return typeof value === 'string' && /(^1\d{10}$)/.test(value);
}
