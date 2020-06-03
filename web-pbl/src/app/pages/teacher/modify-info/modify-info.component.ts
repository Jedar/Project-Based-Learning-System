import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, NzModalService, UploadFile} from "ng-zorro-antd";
import {UploadFileService} from "../../../services/upload-file.service";
import {CommonValidators} from "../../../share/CommonValidator";
import {TeacherService} from "../../../services/teacher.service";
import {AuthService} from "../../../services/auth.service";
import {Md5} from "ts-md5";

@Component({
  selector: 'app-modify-info',
  templateUrl: './modify-info.component.html',
  styleUrls: ['./modify-info.component.css']
})
export class ModifyInfoComponent implements OnInit {

  validateForm!: FormGroup;
  loading = false;
  avatarUrl?: string;

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private uploadFileService: UploadFileService,
    private teacherService: TeacherService,
    private authService: AuthService,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, CommonValidators.minLengthPassword(6), CommonValidators.maxLengthPassword(16)]],
      checkPassword: [null, this.confirmationValidator],
      gender: ["男", [Validators.required]]
    });
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

  modifyInfo(): void {
    var formValue = {};
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      formValue[i] = this.validateForm.controls[i].value;
    }
    if (this.validateForm.valid && this.avatarUrl != undefined) {
      let md5Value = Md5.hashStr(formValue["password"]).toString();
      this.teacherService.modifyTeacherInfo(this.authService.getUserId(), formValue["username"], md5Value, formValue["gender"], "picture")
        .subscribe(result => {
          if (result.code === 200) {
            this.modal.success({
              nzTitle: "",
              nzContent: "修改成功"
            });
          } else {
            this.modal.error({
              nzTitle: "",
              nzContent: result.message
            });
          }
        })
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
