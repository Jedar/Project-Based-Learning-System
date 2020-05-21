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
  ) {
    activatedRoute.params.subscribe(params => {
      this.projectId = Number.parseInt(params['projectId']);
      this.fileService.getFileList(this.projectId).subscribe(result => {
        this.listOfData = result;
      });
    });
  }

  ngOnInit(): void {
  }

  onDelete(fileId:number){
    this.fileService.deleteFile(fileId).subscribe(result => {
      if(result.state == "true"){
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
      project_id:this.projectId,
      file_name:this.fileName,
      path:this.fileList[0].url
    }
    this.fileService.addFile(data).subscribe(result => {
      if(result.state == "true"){
        this.modal.success({
          nzTitle: '上传文件',
          nzContent: '文件上传成功',
          nzOnOk:() => {
            // window.location.href = window.location.href;
            this.router.navigate(['../','file'],{
              queryParams:{
                projectId:this.projectId,
              }
            })
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
      window.location.href = `/file/download?fileId=${path}`;
  }

  handleChange(info: UploadChangeParam): void {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show one recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.fileList = fileList;
  }

}
