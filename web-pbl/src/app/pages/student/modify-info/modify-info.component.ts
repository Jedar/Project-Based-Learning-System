import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, UploadFile} from "ng-zorro-antd";
import {Observable, Observer} from "rxjs";
import {UploadFileService} from "../../../services/upload-file.service";

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
    private uploadFileService: UploadFileService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      gender: [null, [Validators.required]]
    });
  }

  modifyInfo(): void {

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
