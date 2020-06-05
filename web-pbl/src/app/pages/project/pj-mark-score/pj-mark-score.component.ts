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
  selector: 'app-pj-mark-score',
  templateUrl: './pj-mark-score.component.html',
  styleUrls: ['./pj-mark-score.component.css']
})
export class PjMarkScoreComponent implements OnInit {
  students: Student[] = [];
  projectId: number;
  studentId: number = 10009;
  scores: Score[] = [];
  tasksOfStudent: Map<number,Task[]> = new Map<number, Task[]>();

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private scoreService: ScoreService,
    private modal: NzModalService,
    private taskService: TaskService,
  ) {
    activatedRoute.params.subscribe(params => {
      this.projectId = params['projectId'];
    });
  }

  ngOnInit(): void {
    this.studentService.getStudentsOfProject(this.projectId).subscribe(result => {
      this.students = result.data;
      for (let student of this.students){
        this.taskService.getTaskListOfUser(this.projectId, student.sId).subscribe(res => {
          // this.tasks = res;
          this.tasksOfStudent.set(student.sId,res.data);
        });
      }
    });

    this.scoreService.getScores(this.studentId).subscribe(result => {
      this.scores = result.data;
    })
  }

  onSubmit(type:number,userId:number) {
    const params = new HttpParams()
      .set("projectId",String(this.projectId))
      .set("userId",String(userId))
      .set("scoreType",String(type))
      .set("scorerId",String(this.studentId));

    this.scoreService.submitScore(params).subscribe(result => {
      if (result.code == 200) {
        this.modal.success({
          nzTitle: '提交互评',
          nzContent: '提交成功',
        })
      } else {
        this.modal.error({
          nzTitle: '提交失败',
          nzContent: result.message,
        });
      }
    })
  }

}
