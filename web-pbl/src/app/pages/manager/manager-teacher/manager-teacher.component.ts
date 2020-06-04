import { Component, OnInit } from '@angular/core';
import {UserOfTeacher} from "../../../share/common.model";
import {ManagerService} from "../../../services/manager.service";
import {NzModalService} from "ng-zorro-antd";
import {HttpParams} from "@angular/common/http";
import {Teacher} from "../../../share/teacher.model";

@Component({
  selector: 'app-manager-teacher',
  templateUrl: './manager-teacher.component.html',
  styleUrls: ['./manager-teacher.component.css']
})
export class ManagerTeacherComponent implements OnInit {
  listOfData: Teacher[];
  editCache: { [key: string]: { edit: boolean; data: Teacher } } = {};
  pageSize = 10;
  listOfColumn = [
    {
      title: 'ID',
      compare: (a: Teacher, b: Teacher) => a.tId - b.tId,
      priority: 2,
      width: '10%'
    },
    {
      title: '用户名',
      compare: (a: Teacher, b: Teacher) => a.username.localeCompare(b.username),
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
      this.listOfData = result.data;
      this.updateEditCache();
    })
  }

  //TODO: 删除教师信息
  deleteRow(t_id){

    this.managerService.deleteTeacher(t_id).subscribe(result=>{
      if (result.message=="SUCCESS"){
        this.modal.success({
          nzTitle: "",
          nzContent: "删除成功"
        });
        this.listOfData = this.listOfData.filter(item => item.tId !== t_id);
      }else{
        this.modal.error({
          nzTitle: "删除失败",
          nzContent: result.message
        });
      }
    });
  }
  startEdit(t_id): void {
    this.editCache[t_id].edit = true;
  }

  cancelEdit(t_id): void {
    const index = this.listOfData.findIndex(item => item.tId === t_id);
    this.editCache[t_id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }
  //TODO: 更改教师信息
  saveEdit(t_id): void {
    var data = this.editCache[t_id].data;
    if (data.username!=""&&data.school!=""){//输入不能为空
      this.managerService.saveTeacherInformation(data.tId, data.username, data.gender, data.school).subscribe(
        result=>{
          if (result.message=="SUCCESS"){
            this.modal.success({
              nzTitle: "",
              nzContent: "保存成功"
            });
            const index = this.listOfData.findIndex(item => item.tId === t_id);
            Object.assign(this.listOfData[index], this.editCache[t_id].data);
          }else{
            this.modal.error({
              nzTitle: "",
              nzContent: "保存失败"
            });
            this.updateEditCache();
          }
        });
      this.editCache[t_id].edit = false;
    }else{
      this.modal.info({
        nzTitle: "",
        nzContent: "输入不能为空"
      })
    }

  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.tId] = {
        edit: false,
        data: { ...item }
      };
    });
  }
}
