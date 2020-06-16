import { Component, OnInit } from '@angular/core';
import { MemoService } from '../../../services/memo.service';
import { Memo,MemoMessage } from '../../../share/memo.model';
import {Router} from "@angular/router";
import {NzMessageService, NzModalRef, NzModalService} from "ng-zorro-antd";
import {AuthService} from "../../../services/auth.service";
import {ProjectService} from "../../../services/project.service";
import {TaskService} from "../../../services/task.service";



@Component({
  selector: 'app-memo-list',
  templateUrl: './memo-list.component.html',
  styleUrls: ['./memo-list.component.css']
})
export class MemoListComponent implements OnInit {
  list:MemoMessage[] = [];
  userId:number;
  isDelete:boolean;
  isRead:boolean;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private modal: NzModalService,
    private message: NzMessageService,
    private authService: AuthService,
    private taskService: TaskService,
    private memoService:MemoService,
  ) {
    this.userId = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.memoService.memoList(this.userId).subscribe(result => {
      if(result.code == 200){
        this.list = result.data;
      }
      else{
        window.alert(result.message);
      }
    })
  }

  onDelete(memoId:number){
    if(this.isDelete){
      return;
    }
    this.memoService.deleteMemo(memoId).subscribe(result=>{
      if(result.code == 200){
        this.message.success("删除成功");
        this.list = this.list.filter(item => {
          return item.memoId != memoId;
        })
      }
      else{
        this.message.error(result.message);
      }
      this.isDelete = false;
    });
  }

  onRead(memoId:number){
    if(this.isRead){
      return;
    }
    this.memoService.readMemo(memoId).subscribe(result=>{
      if(result.code == 200){
        this.message.success("已阅读");
        this.list.forEach(item => {
          if(item.memoId == memoId){
            item.read = 1;
          }
        })
      }
      else{
        this.message.error(result.message);
      }
      this.isRead = false;
    });
  }

}
