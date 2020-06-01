import { Component, OnInit } from '@angular/core';
import {ManagerService} from "../../../services/manager.service";
import {UserOfStudent} from "../../../share/common.model";
import {HttpParams} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd";
import {Student} from "../../../share/student.model";

@Component({
  selector: 'app-manager-student',
  templateUrl: './manager-student.component.html',
  styleUrls: ['./manager-student.component.css']
})
export class ManagerStudentComponent implements OnInit {
  listOfData: Student[];
  editCache: { [key: string]: { edit: boolean; data: Student } } = {};
  pageSize = 10;
  listOfColumn = [
    {
      title: 'ID',
      compare: (a: Student, b: Student) => a.sId - b.sId,
      priority: 2,
      width: '10%'
    },
    {
      title: '用户名',
      compare: (a: Student, b: Student) => a.username.localeCompare(b.username),
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
    this.managerService.studentList().subscribe(result=>{
      this.listOfData = result;
      this.updateEditCache();
    })
  }

  //TODO: 删除学生信息
  deleteRow(s_id){
    console.log(typeof s_id);
    var params = new HttpParams()
      .set("s_id", s_id);
    console.log(params);
    this.managerService.deleteStudent(params).subscribe(result=>{
      if (result.state=="success"){
        this.modal.success({
          nzTitle: "",
          nzContent: "删除成功"
        });
        this.listOfData = this.listOfData.filter(item => item.sId !== s_id);
      }else{
        this.modal.error({
          nzTitle: "删除失败",
          nzContent: result.message
        });
      }
    });
  }
  startEdit(s_id): void {
    this.editCache[s_id].edit = true;
  }

  cancelEdit(s_id): void {
    const index = this.listOfData.findIndex(item => item.sId === s_id);
    this.editCache[s_id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }
  //TODO: 更改学生信息
  saveEdit(s_id): void {
    var data = this.editCache[s_id].data;
    if (data.username!=""&&data.school!=""){//输入不为空
      var params = new HttpParams()
        .set("s_id", data.sId+"")
        .set("username", data.username)
        .set("gender", data.gender)
        .set("school",data.school);
      console.log(params);
      this.managerService.saveStudentInformation(params).subscribe(result=>{
        if (result.state=="success"){
          this.modal.success({
            nzTitle: "",
            nzContent: "保存成功"
          });
          const index = this.listOfData.findIndex(item => item.sId === s_id);
          Object.assign(this.listOfData[index], this.editCache[s_id].data);
        }else{
          this.modal.error({
            nzTitle: "",
            nzContent: "保存失败"
          });
        }
      });
      this.editCache[s_id].edit = false;
    }else{
      this.modal.info({
        nzTitle:"",
        nzContent: "输入不能为空"
      })
    }

  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.sId] = {
        edit: false,
        data: { ...item }
      };
    });
  }
}
