import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, UploadFile} from "ng-zorro-antd";
import {UploadFileService} from "../../../services/upload-file.service";

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {

  validateForm!: FormGroup;
  loading = false;
  avatarUrl?: string;

  constructor(
    private fb: FormBuilder,
    private uploadFileService: UploadFileService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      maxStudentNumber: [null, [Validators.required]],
    });
  }

  addCourse(): void {

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
