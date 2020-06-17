import {Component, OnInit} from '@angular/core';
import {Student} from "../../../share/student.model";
import {StudentService} from "../../../services/student.service";
import {ActivatedRoute} from "@angular/router";
import {Score, StudentScore} from "../../../share/score.model";
import {ScoreService} from "../../../services/score.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {Task} from "../../../share/task.model";
import {TaskService} from "../../../services/task.service";
import {HttpParams} from "@angular/common/http";
import {DiscussionService} from "../../../services/discussion.service";
import {AuthService} from "../../../services/auth.service";
import {ProjectService} from "../../../services/project.service";
import {Project} from "../../../share/project.model";

@Component({
  selector: 'app-pj-mark-mate',
  templateUrl: './pj-mark-mate.component.html',
  styleUrls: ['./pj-mark-mate.component.css']
})
export class PjMarkMateComponent implements OnInit {
  selfEva: number = 0;
  mutEva: number = 0;
  selfComment: string = "";
  project: Project = null;


  studentScore:StudentScore[] = [];
  projectId: number;
  studentId: number;
  scores:Score[] = [];
  replyOfStudent:Map<number,number> = new Map<number, number>();
  publishOfStudent:Map<number,number> = new Map<number, number>();
  tasksOfStudent: Map<number, Task[]> = new Map<number, Task[]>();
  ifHasMulEva:Map<number,boolean> = new Map<number, boolean>();

  ifHasSelfEva:boolean = false;
  timeLimit:boolean = false;

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private scoreService: ScoreService,
    private modal: NzModalService,
    private taskService: TaskService,
    private discussionService: DiscussionService,
    private authService:AuthService,
    private projectService: ProjectService,
  ) {
    activatedRoute.params.subscribe(params => {
      this.projectId = taskService.getProjectId();
      this.studentId = authService.getUserId();
    });
  }

  onSubmit(type: number, userId: number) {
    let value = 0;
    let comment = "";
    if (type == 1){
      value = this.selfEva;
      comment = this.selfComment;
    } else{
      for (let student of this.studentScore){
        if(student.sId == userId){
          value = student.value;
          comment = student.comment;
        }
      }
    }
    let n = Number(value);

    if (isNaN(n)) {
      this.modal.error({
        nzTitle: '提交失败',
        nzContent: "分数输入应为0-100的数值",
      });
      return;
    }
    if(comment == null)comment="";

    if (value <0 || value>100){
      this.modal.error({
        nzTitle: '提交失败',
        nzContent: "分数应在0~100之间",
      });
      return;
    }

    value = Math.ceil(value);
    const params = new HttpParams()
      .set("projectId", String(this.projectId))
      .set("userId", String(userId))
      .set("scoreType", String(type))
      .set("scorerId", String(this.studentId))
      .set("value", String(value))
      .set("comment", comment);

    this.scoreService.submitScore(params).subscribe(result => {
      if (result.code == 200) {
        this.modal.success({
          nzTitle: '提交分数',
          nzContent: '提交成功',
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

  init(){
    this.scoreService.getStudentsOfProject(this.projectId).subscribe(result => {
      this.studentScore = result.data;
      for (let i=0;i<this.studentScore.length;i++){
        // console.log(this.studentScore[i].sId,this.studentId);
        if (this.studentScore[i].sId == this.studentId){
          this.studentScore.splice(i,1);
          break;
        }
      }
      for (let student of this.studentScore) {
        this.scoreService.getAllScores(this.projectId).subscribe(res=>{
          if(res.code == 200)this.scores = res.data;
          let flag = false;
          for (let score of this.scores){
            if(score.userId == this.studentId && score.scoreType == 1)this.ifHasSelfEva = true;
            if (score.userId == student.sId && score.scoreType == 2 && score.scorerId == this.studentId) {
              this.ifHasMulEva.set(student.sId, true);
              flag = true;
            }
          }
          if(!flag)this.ifHasMulEva.set(student.sId, false);
        });

        this.taskService.getTaskListOfUser(this.projectId, student.sId).subscribe(res => {
          if(res.code == 200)this.tasksOfStudent.set(student.sId, res.data);
        });

        this.discussionService.getPublishCount(student.sId).subscribe(res=>{
          if(res.code == 200)this.publishOfStudent.set(student.sId,res.data);
        });

        this.discussionService.getReplyCount(student.sId).subscribe(res=>{
          if(res.code == 200)this.replyOfStudent.set(student.sId,res.data);
        });
      }
    });

  }
  ngOnInit(): void {
    this.init();
  }


}
