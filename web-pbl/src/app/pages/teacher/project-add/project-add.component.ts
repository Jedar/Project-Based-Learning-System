import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {

  validateForm!: FormGroup;

  range = [30, 70];
  value1 = 30;
  value2 = 40;
  value3 = 30;

  onRangeChange(): void {
    const scoreInfo = this.validateForm.controls.scoreInfo.value;
    this.value1 = scoreInfo[0];
    this.value2 = scoreInfo[1] - scoreInfo[0];
    this.value3 = 100 - scoreInfo[1];
  }
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      theme: [null, [Validators.required]],
      timeRange: [null, [Validators.required]],
      scoreInfo: [[30, 70]]
    });
  }

  formatter(value: number): string {
    return `${value}%`;
  }

  addProject(): void {
    var formValue = {};
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      formValue[i] = this.validateForm.controls[i].value;
    }
  }
}
