import { Component, OnInit } from '@angular/core';
import {ManagerService} from "../../../services/manager.service";
import {NzModalService} from "ng-zorro-antd";
import {HttpParams} from "@angular/common/http";
import {Project} from "../../../share/project.model";
import {ManagerCourse} from "../../../share/common.model";

@Component({
  selector: 'app-manager-project',
  templateUrl: './manager-project.component.html',
  styleUrls: ['./manager-project.component.css']
})
export class ManagerProjectComponent implements OnInit {
  listOfData: Project[];
  courseList: ManagerCourse[];
  timeRange: Date[];
  editCache: { [key: string]: { edit: boolean; data: Project } } = {};
  pageSize = 10;
  listOfColumn = [
    {
      title: '项目ID',
      compare: (a: Project, b: Project) => a.project_id - b.project_id,
      priority: 2,
      width: '10%'
    },
    {
      title: '课程ID',
      compare: (a: Project, b: Project) => a.project_id - b.project_id,
      priority: 2,
      width: '10%'
    },
    {
      title: '项目名称',
      compare: (a: Project, b: Project) => a.project_name.localeCompare(b.project_name),
      priority: 1,
      width: '15%'
    },
    {
      title: '项目主题',
      width: '15%'
    },
    {
      title: '项目起止时间',
      width: '20%'
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
    this.managerService.projectList().subscribe(result=>{
      this.listOfData = result;
      this.updateEditCache();
    });
    this.managerService.courseList().subscribe(result=>{
      this.courseList = result;
    });
  }

  //TODO: 删除项目信息
  deleteRow(id){
    console.log(typeof id);
    var params = new HttpParams()
      .set("project_id", id);
    console.log(params);
    this.managerService.deleteProject(params).subscribe(result=>{
      if (result.state=="success"){
        this.modal.success({
          nzTitle: "",
          nzContent: "删除成功"
        });
        this.listOfData = this.listOfData.filter(item => item.project_id !== id);
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
    const index = this.listOfData.findIndex(item => item.project_id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }
  //TODO: 更改项目信息
  saveEdit(id): void {
    var data = this.editCache[id].data;
    if (data.project_name!=""&&data.theme!=""&&this.timeRange!=null){
      var start_time = this.managerService.UTCTODateString(this.timeRange[0]);
      var end_time = this.managerService.UTCTODateString(this.timeRange[1]);
      var params = new HttpParams()
        .set("project_id", data.project_id+"")
        .set("course_id", data.course_id+"")
        .set("project_name", data.project_name)
        .set("theme",data.theme)
        .set("start_time", start_time)
        .set("end_time", end_time);
      console.log(params);
      this.managerService.saveProjectInformation(params).subscribe(result=>{
        if (result.state=="success"){
          this.modal.success({
            nzTitle: "",
            nzContent: "保存成功"
          });
          const index = this.listOfData.findIndex(item => item.project_id === id);
          Object.assign(this.listOfData[index], this.editCache[id].data);
          this.listOfData[index].start_time = start_time;
          this.listOfData[index].end_time = end_time;
        }else{
          this.modal.error({
            nzTitle: "",
            nzContent: "保存失败"
          });
        }
      });
      this.editCache[id].edit = false;
    }else{
      this.modal.info({
        nzTitle:"",
        nzContent: "输入不能为空"
      })
    }

  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.project_id] = {
        edit: false,
        data: { ...item }
      };
    });
  }
}
