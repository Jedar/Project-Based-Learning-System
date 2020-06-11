import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ManagerService} from "../../../services/manager.service";
import {NzModalService} from "ng-zorro-antd";
import {differenceInCalendarDays} from "date-fns";

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css'],
  inputs: ['courseId']
})
export class ProjectAddComponent implements OnInit {

  courseId;

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
    private managerService: ManagerService,
    private modal: NzModalService,
  ) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      course: [this.courseId,[Validators.required]],
      name: [null, [Validators.required]],
      theme: [null, [Validators.required]],
      timeRange: [null, [Validators.required]],
      scoreTimeRange: [null, [Validators.required]],
      scoreInfo: [[30, 70]]
    });
  }

  disabledDate;

  changeDisabledDate(){
    this.disabledDate = (current: Date): boolean => {
      // Can not select days before today and today
      var timeRange = this.validateForm.controls.timeRange.value;
      var start_time = timeRange[0];
      var end_time = timeRange[1];

      return differenceInCalendarDays(current, start_time) < 0 || differenceInCalendarDays(current, end_time) > 0;
    };
  }


  formatter(value: number): string {
    return `${value}%`;
  }

  cleanFormValue(){
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].setValue("");
    }
  }

  submitForm(): void {
    var formValue = {};
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      formValue[i] = this.validateForm.controls[i].value;
      console.log(formValue[i]);
      console.log(typeof formValue[i])
    }
    if (this.validateForm.valid) {
      var start_time = this.managerService.UTCTODateString(formValue["timeRange"][0]);
      var end_time = this.managerService.UTCTODateString(formValue["timeRange"][1]);

      var score_start_time = this.managerService.UTCTODateString(formValue["scoreTimeRange"][0]);
      var score_end_time = this.managerService.UTCTODateString(formValue["scoreTimeRange"][1]);

      this.managerService.createProject(
        formValue["course"], formValue["name"], formValue["theme"], start_time, end_time,score_start_time,score_end_time, this.value1, this.value2, this.value3).subscribe(result => {
        if (result.message == "SUCCESS") {
          this.modal.success({
            nzTitle: "",
            nzContent: "创建成功"
          });
        } else {
          this.modal.error({
            nzTitle: "创建失败",
            nzContent: result.message
          });
          this.cleanFormValue();
        }
      })
    }
  }
}
