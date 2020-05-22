import { Component, OnInit } from '@angular/core';
import {ManagerCourse, UserOfTeacher} from "../../../share/common.model";
import {ManagerService} from "../../../services/manager.service";
import {NzModalService} from "ng-zorro-antd";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-manager-class',
  templateUrl: './manager-class.component.html',
  styleUrls: ['./manager-class.component.css']
})
export class ManagerClassComponent implements OnInit {
  teacherList: UserOfTeacher[];
  listOfData: ManagerCourse[];
  editCache: { [key: string]: { edit: boolean; data: ManagerCourse } } = {};
  pageSize = 10;
  listOfColumn = [
    {
      title: 'ID',
      compare: (a: ManagerCourse, b: ManagerCourse) => a.course_id - b.course_id,
      priority: 3,
      width: '10%'
    },
    {
      title: '课程名称',
      compare: (a: ManagerCourse, b: ManagerCourse) => a.course_name.localeCompare(b.course_name),
      priority: 2,
      width: '10%'
    },
    {
      title: '开课教师',
      compare: (a: ManagerCourse, b: ManagerCourse) => a.teacherName.localeCompare(b.teacherName),
      priority: 1,
      width: '10%'
    },
    {
      title: '课程描述',
      width: '15%'
    },
    {
      title: '最大选课人数',
      width: '15%'
    },
    {
      title: '管理员操作',
      width: '10%'
    }
  ];
  constructor(
    private managerService: ManagerService,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.managerService.courseList().subscribe(result=>{
      this.listOfData = result;
      this.updateEditCache();
    });
    this.managerService.teacherList().subscribe(result=>{
      this.teacherList = result;
    })
  }

  //TODO: 删除课程信息
  deleteRow(id){
    console.log(typeof id);
    var params = new HttpParams()
      .set("id", id);
    console.log(params);
    this.managerService.deleteClass(params).subscribe(result=>{
      if (result.state=="success"){
        this.modal.success({
          nzTitle: "",
          nzContent: "删除成功"
        });
        this.listOfData = this.listOfData.filter(item => item.course_id !== id);
      }else{
        this.modal.error({
          nzTitle: "删除失败",
          nzContent: result.message
        });
      }
    });
  }
  startEdit(id): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id): void {
    const index = this.listOfData.findIndex(item => item.course_id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }
  //TODO: 更改课程信息
  saveEdit(id): void {
    var data = this.editCache[id].data;
    var params = new HttpParams()
      .set("course_id", data.course_id + "")
      .set("course_name", data.course_name)
      .set("teacherName", data.teacherName)
      .set("description", data.description)
      .set("maxStudentNumber", data.maxStudentNumber + "");
    console.log(params);
    this.managerService.saveClassInformation(params).subscribe(result=>{
      if (result.state=="success"){
        this.modal.success({
          nzTitle: "",
          nzContent: "保存成功"
        });
        const index = this.listOfData.findIndex(item => item.course_id === id);
        Object.assign(this.listOfData[index], this.editCache[id].data);
      }else{
        this.modal.error({
          nzTitle: "",
          nzContent: "保存失败"
        });
      }
    });
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.course_id] = {
        edit: false,
        data: { ...item }
      };
    });
  }
}
