import {Component, OnInit} from '@angular/core';
import {Student} from "../../../share/student.model";
import {StudentService} from "../../../services/student.service";
import {ActivatedRoute} from "@angular/router";
import {Score} from "../../../share/score.model";
import {ScoreService} from "../../../services/score.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {Task} from "../../../share/task.model";
import {TaskService} from "../../../services/task.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-pj-mark-mate',
  templateUrl: './pj-mark-mate.component.html',
  styleUrls: ['./pj-mark-mate.component.css']
})
export class PjMarkMateComponent implements OnInit {
  selfEva:number = 0;
  comment:string;
  students: Student[] = [];
  projectId:number;
  studentId: number = 10009;
  scores:Score[] = [];
  tasksOfStudent: Map<number,Task[]> = new Map<number, Task[]>();

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private scoreService:ScoreService,
    private modal: NzModalService,
    private taskService: TaskService,
  ) {
    activatedRoute.params.subscribe(params => {
      this.projectId = params['projectId'];
    });
  }

  onSelfEvaSubmit(type:number,userId:number) {
    this.projectId = 1;
    const params = new HttpParams()
      .set("projectId",String(this.projectId))
      .set("userId",String(userId))
      .set("scoreType",String(type))
      .set("scorerId",String(this.studentId))
      .set("value",String(this.selfEva))
      .set("comment",this.comment);

    this.scoreService.submitScore(params).subscribe(result=>{
      if (result.code == 200) {
        this.modal.success({
          nzTitle: '提交自评',
          nzContent: '提交成功',
        })
      }else {
        this.modal.error({
          nzTitle: '提交失败',
          nzContent: result.message,
        });
      }
    })
  }

  ngOnInit(): void {
    this.studentService.getStudentsOfProject(this.projectId).subscribe(result => {
      this.students = result;
      for (let student of this.students){
        this.taskService.getTaskListOfUser(this.projectId, student.sId).subscribe(res => {
          // this.tasks = res;
          this.tasksOfStudent.set(student.sId,res.data);
        });
      }
    });
    this.scoreService.getScores(this.studentId).subscribe(result=>{
      this.scores = result.data;
    })
  }

}
