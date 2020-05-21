import { Component, OnInit } from '@angular/core';
import {UserOfTeacher} from "../../../share/common.model";
import {ManagerService} from "../../../services/manager.service";
import {NzModalService} from "ng-zorro-antd";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-manager-teacher',
  templateUrl: './manager-teacher.component.html',
  styleUrls: ['./manager-teacher.component.css']
})
export class ManagerTeacherComponent implements OnInit {
  listOfData: UserOfTeacher[];
  editCache: { [key: string]: { edit: boolean; data: UserOfTeacher } } = {};
  pageSize = 10;
  listOfColumn = [
    {
      title: 'ID',
      compare: (a: UserOfTeacher, b: UserOfTeacher) => a.t_id - b.t_id,
      priority: 2,
      width: '10%'
    },
    {
      title: '用户名',
      compare: (a: UserOfTeacher, b: UserOfTeacher) => a.username.localeCompare(b.username),
      priority: 1,
      width: '10%'
    },
    {
      title: '性别',
      width: '10%'
    },
    {
      title: '学校',
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
    this.managerService.teacherList().subscribe(result=>{
      this.listOfData = result;
      this.updateEditCache();
    })
  }

  //TODO: 删除学生信息
  deleteRow(t_id){
    console.log(typeof t_id);
    var params = new HttpParams()
      .set("t_id", t_id);
    console.log(params);
    this.managerService.deleteTeacher(params).subscribe(result=>{
      if (result.state=="success"){
        this.modal.success({
          nzTitle: "",
          nzContent: "删除成功"
        });
        this.listOfData = this.listOfData.filter(item => item.t_id !== t_id);
      }else{
        this.modal.error({
          nzTitle: "",
          nzContent: "删除失败"
        });
      }
    });
  }
  startEdit(t_id): void {
    this.editCache[t_id].edit = true;
  }

  cancelEdit(t_id): void {
    const index = this.listOfData.findIndex(item => item.t_id === t_id);
    this.editCache[t_id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }
  //TODO: 更改学生信息
  saveEdit(t_id): void {
    var data = this.editCache[t_id].data;
    var params = new HttpParams()
      .set("t_id", data.t_id+"")
      .set("username", data.username)
      .set("gender", data.gender)
      .set("school",data.school);
    console.log(params);
    this.managerService.saveTeacherInformation(params).subscribe(
      result=>{
      if (result.state=="success"){
        this.modal.success({
          nzTitle: "",
          nzContent: "保存成功"
        });
        const index = this.listOfData.findIndex(item => item.t_id === t_id);
        Object.assign(this.listOfData[index], this.editCache[t_id].data);
      }else{
        this.modal.error({
          nzTitle: "",
          nzContent: "保存失败"
        });
      }
    });
    this.editCache[t_id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.t_id] = {
        edit: false,
        data: { ...item }
      };
    });
  }
}
