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
import {ProjectService} from "../../../services/project.service";

@Component({
  selector: 'app-pj-mark-mate',
  templateUrl: './pj-mark-mate.component.html',
  styleUrls: ['./pj-mark-mate.component.css']
})
export class PjMarkMateComponent implements OnInit {
  selfEva: number = 0;
  mutEva: number = 0;
  comment: string = "";


  students: Student[] = [];
  projectId: number;
  studentId: number;
  scores:Score[] = [];
  replyOfStudent:Map<number,number> = new Map<number, number>();
  publishOfStudent:Map<number,number> = new Map<number, number>();
  tasksOfStudent: Map<number, Task[]> = new Map<number, Task[]>();
  ifHasMulEva:Map<number,boolean> = new Map<number, boolean>();

  ifHasSelfEva:boolean = false;

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
      this.studentId = authService.getUserId();
    });
  }

  onSubmit(type: number, userId: number) {
    let value = 0;
    if (type == 1)
      value = this.selfEva;
    else
      value = this.mutEva;

    if (value <0 || value>100){
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
      .set("scorerId", String(this.studentId))
      .set("value", String(value))
      .set("comment", this.comment);

    this.scoreService.submitScore(params).subscribe(result => {
      if (result.code == 200) {
        this.modal.success({
          nzTitle: '提交分数',
          nzContent: '提交成功',
          nzOnOk: () => {
            this.students = this.students.filter((student: Student) => student.sId != userId);
            this.init();
          }
        })
      } else {
        this.modal.error({
          nzTitle: '提交失败',
          nzContent: result.message,
        });
      }
    })
  }

  init(){

    this.scoreService.getAllScores().subscribe(res=>{
      if(res.code == 200)this.scores = res.data;
      for (let score of this.scores){
        if(score.userId == this.studentId && score.scoreType == 1)this.ifHasSelfEva = true;
      }
    });
    this.studentService.getStudentsOfProject(this.projectId).subscribe(result => {
      this.students = result.data;
      for (let i=0;i<this.students.length;i++){
        if (this.students[i].sId == this.studentId){
          this.students.splice(i,i+1);
        }
      }
      for (let student of result.data) {
        this.taskService.getTaskListOfUser(this.projectId, student.sId).subscribe(res => {
          this.tasksOfStudent.set(student.sId, res.data);
        });

        this.discussionService.getPublishCount(student.sId).subscribe(res=>{
          if(res.code == 200)this.publishOfStudent.set(student.sId,res.data);
        });

        this.discussionService.getReplyCount(student.sId).subscribe(res=>{
          if(res.code == 200)this.replyOfStudent.set(student.sId,res.data);
        });

        let flag = false;
        console.log(this.scores.length);
        for (let score of this.scores) {
          console.log(score.userId,score.scoreType,score.scorer_id);
          if (score.userId == student.sId && score.scoreType == 2 && score.scorer_id == this.studentId) {
            // console.log(score.userId,score.scoreType,score.scorer_id);
            this.ifHasMulEva.set(student.sId, true);
            flag = true;
            break;
          }
        }
        if(!flag)this.ifHasMulEva.set(student.sId, false);
      }
      console.log(this.ifHasMulEva);
    });

  }
  ngOnInit(): void {
    console.log(this.authService.getUserId());
    this.studentId = this.authService.getUserId();
    this.projectId = this.taskService.getProjectId();
    this.init();

    //Todo：判断是否在互评时间内

  }


}
