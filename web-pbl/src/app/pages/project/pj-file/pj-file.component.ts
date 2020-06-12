import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonValidators } from '../../../share/CommonValidator';
import { ActivatedRoute,Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

import { Project } from '../../../share/project.model';
import { ProjectService } from '../../../services/project.service';
import { FileResourse,FileUpload } from '../../../share/file.model';
import { FileService } from '../../../services/file.service';
import { UploadChangeParam, UploadFile } from 'ng-zorro-antd/upload';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-pj-file',
  templateUrl: './pj-file.component.html',
  styleUrls: ['./pj-file.component.css']
})
export class PjFileComponent implements OnInit {
  listOfData:FileResourse[] = [];
  projectId:number;
  isSubmit:boolean;

  fileName:string;

  fileList: UploadFile[] = [
    // {
    //   uid: '-1',
    //   name: 'xxx.png',
    //   status: 'done',
    //   url: 'http://www.baidu.com/xxx.png'
    // }
  ];

  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项',
      email: '邮箱格式不正确'
    },
    en: {
      required: 'Input is required',
      email: 'The input is not valid email'
    }
  };

  constructor(
    public fb: FormBuilder,
    private modal: NzModalService,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private fileService: FileService,
    private router:Router,
    private taskService:TaskService,
    private msg:NzMessageService,
    private authService:AuthService,
  ) {
    activatedRoute.params.subscribe(params => {
      // this.projectId = Number.parseInt(params['projectId']);
      this.projectId = taskService.getProjectId();
      this.fileService.getFileList(this.projectId).subscribe(result => {
        if(result.code == 200){
          this.listOfData = result.data;
        }
        else{
          window.alert("文件加载失败："+result.message);
        }
        
      });
    });
  }

  ngOnInit(): void {
  }

  onDelete(fileId:number){
    this.fileService.deleteFile(fileId).subscribe(result => {
      if(result.code === 200){
        this.modal.success({
          nzTitle: '删除文件',
          nzContent: '文件删除成功',
          nzOnOk:() => {
            this.listOfData = this.listOfData.filter(file => {return file.file_id != fileId});
          }
        })
      }
      else{
        this.modal.error({
          nzTitle: '文件删除失败，请稍后再试',
          nzContent: result.message,
        });
      }
    });
  }

  onSubmit(){
    if(!this.fileName){
      this.modal.error({
        nzTitle: '表单错误',
        nzContent: '请填写文件名称',
      });
      return;
    }

    if(this.fileList.length == 0){
      this.modal.error({
        nzTitle: '表单错误',
        nzContent: '请上传文件',
      });
      return;
    }
    
    let data:FileUpload = {
      projectId:this.projectId,
      fileName:this.fileName,
      path:this.fileList[0].url,
      userId:this.authService.getUserId(),
    }
    this.fileService.addFile(data).subscribe(result => {
      if(result.code === 200){
        this.modal.success({
          nzTitle: '上传文件',
          nzContent: '文件上传成功',
          nzOnOk:() => {
            this.fileList = [];
            this.fileName = "";
            this.fileService.getFileList(this.projectId).subscribe(result => {
              this.listOfData = result.data;
            });
          }
        })
      }
      else{
        this.modal.error({
          nzTitle: '文件上传失败，请稍后再试',
          nzContent: result.message,
        });
      }
    })
  }

  onDownload(path:string){
      // window.location.href = `${path}`;
      const newWindow = window.open('about:blank', '_blank');
      newWindow.location.href = `${path}`;
  }

  handleChange(info: UploadChangeParam): void {
    let fileList = [...info.fileList];
    console.log(info);

    let flag = false;

    // 1. Limit the number of uploaded files
    // Only to show one recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        if(file.response.code == 200){
          file.url = file.response.data;
        }
        else{
          flag =true;
          this.modal.error({
            nzTitle: '文件上传失败，请稍后再试',
            nzContent: file.response.message,
          });
        }
        
      }
      return file;
    });
    if(flag){
      fileList = [];
    }

    this.fileList = fileList;
  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const fileList = [
        "text/csv","image/gif", "image/jpeg","image/png","text/html","application/pdf","text/plain","application/xml","application/zip"
      ];
      const isValid = (fileList.lastIndexOf(file.type) !== -1);
      if (!isValid) {
        this.msg.error('文件类型不合法');
        observer.complete();
        return;
      }
      const isLt = file.size / 1024 / 1024 < 10;
      if (!isLt) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isValid && isLt);
      observer.complete();
    });
  };

}
