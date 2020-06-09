import {Component, OnInit} from '@angular/core';
import {Score} from "../../../share/score.model";
import {ScoreService} from "../../../services/score.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {TaskService} from "../../../services/task.service";

@Component({
  selector: 'app-pj-my-score',
  templateUrl: './pj-my-score.component.html',
  styleUrls: ['./pj-my-score.component.css']
})
export class PjMyScoreComponent implements OnInit {
  scores: Score[] = [];
  projectId: number;
  studentId: number;
  totalScore: number = 0;
  selfEva: number = 0;//自评
  mutEva: number = 0;//互评
  teacherEva: number = 0;//教师评价

  constructor(
    private scoreService: ScoreService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private taskService: TaskService,
  ) {
    activatedRoute.params.subscribe(params => {
      this.projectId = taskService.getProjectId();
      this.studentId = authService.getUserId();
    });
  }

  ngOnInit(): void {
    console.log(this.studentId);
    this.scoreService.getScores(this.studentId).subscribe(result => {
      this.scores = result.data;
      let count = 0;
      console.log(this.scores);
      for (let score of this.scores) {
        let s = score.distribute * score.value;
        console.log(s);
        switch (score.scoreType) {
          case 1:
            this.selfEva = s;
            break;
          case 2:
            this.mutEva += s;
            count++;
            break;
          case 3:
            this.teacherEva = s;
            break;
          default:
            break;
        }
      }
      this.mutEva = this.mutEva / count;
      console.log(this.mutEva,count);
      this.totalScore = this.selfEva + this.teacherEva + this.mutEva;
    });
  }

}
