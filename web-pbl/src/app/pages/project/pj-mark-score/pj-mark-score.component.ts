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
import {DiscussionService} from "../../../services/discussion.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-pj-mark-score',
  templateUrl: './pj-mark-score.component.html',
  styleUrls: ['./pj-mark-score.component.css']
})
export class PjMarkScoreComponent implements OnInit {
  students: Student[] = [];
  projectId: number;
  teacherId: number = 10009;
  scores:Score[] = [];
  tasksOfStudent: Map<number, Task[]> = new Map<number, Task[]>();
  replyOfStudent:Map<number,number> = new Map<number, number>();
  publishOfStudent:Map<number,number> = new Map<number, number>();
  value: number = 0;
  comment:string = "";
  ifHasMulEva:Map<number,boolean> = new Map<number, boolean>();

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private scoreService: ScoreService,
    private modal: NzModalService,
    private taskService: TaskService,
    private discussionService: DiscussionService,
    private authService:AuthService,
  ) {
    activatedRoute.params.subscribe(params => {
      this.projectId = taskService.getProjectId();
      this.teacherId = authService.getUserId();
    });
  }

  init(){
    this.scoreService.getAllScores().subscribe(res=>{
      if(res.code == 200)this.scores = res.data;
    });
    this.studentService.getStudentsOfProject(this.projectId).subscribe(result => {
      this.students = result.data;
      for (let student of result.data) {
        this.taskService.getTaskListOfUser(this.projectId, student.sId).subscribe(res => {
          if(res.code == 200)this.tasksOfStudent.set(student.sId, res.data);
        });

        this.discussionService.getPublishCount(student.sId).subscribe(res=>{
          if(res.code == 200)this.publishOfStudent.set(student.sId,res.data);
        });

        this.discussionService.getReplyCount(student.sId).subscribe(res=>{
          if(res.code == 200)this.replyOfStudent.set(student.sId,res.data);
        });

        let flag = false;
        for (let score of this.scores) {
          // console.log(score.userId,score.scoreType,score.scorerId);
          if (score.userId == student.sId && score.scoreType == 3 && score.scorerId == this.teacherId) {
            this.ifHasMulEva.set(student.sId, true);
            flag = true;
            break;
          }
        }
        if(!flag)this.ifHasMulEva.set(student.sId, false);
      }
    });
    console.log(this.ifHasMulEva);

  }

  ngOnInit(): void {
    this.init();
  }

  onSubmit(type: number, userId: number) {
    if(this.value <0 || this.value>100){
      this.modal.error({
        nzTitle: '提交失败',
        nzContent: "分数应在0~100之间",
      });
      return;
    }
    const params = new HttpParams()
      .set("projectId", String(this.projectId))
      .set("userId", String(userId))
      .set("scoreType", String(type))
      .set("scorerId", String(this.teacherId))
      .set("value", String(this.value))
      .set("comment", this.comment);

    this.scoreService.submitScore(params).subscribe(result => {
      if (result.code == 200) {
        this.modal.success({
          nzTitle: '提交分数',
          nzContent: '提交成功',
          nzOnOk: () => {
            this.students = this.students.filter((student: Student) => student.sId != userId);
          }
        });
        this.init();
      } else {
        this.modal.error({
          nzTitle: '提交失败',
          nzContent: result.message,
        });
      }
    })
  }

}
