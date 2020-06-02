import {Component, OnInit} from '@angular/core';
import {Score} from "../../../share/score.model";
import {ScoreService} from "../../../services/score.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pj-my-score',
  templateUrl: './pj-my-score.component.html',
  styleUrls: ['./pj-my-score.component.css']
})
export class PjMyScoreComponent implements OnInit {
  scores: Score[] = [];
  projectId: number;
  studentId: number = 10009;
  totalScore: number = 0;
  selfEva: number = 0;//自评
  mutEva: number = 0;//互评
  teacherEva: number = 0;//教师评价

  constructor(
    private scoreService: ScoreService,
    private activatedRoute: ActivatedRoute,
  ) {
    activatedRoute.params.subscribe(params => {
      this.projectId = params['projectId'];
    });
  }

  ngOnInit(): void {
    this.scoreService.getScores(this.studentId).subscribe(result => {
      this.scores = result.data;
      for (let score of this.scores) {
        let s = score.distribute * score.value;
        switch (score.scoreType) {
          case 1:
            this.selfEva = s;
            break;
          case 2:
            this.mutEva = s;
            break;
          case 3:
            this.teacherEva = s;
            break;
          default:
            break;
        }
      }
      this.totalScore = this.selfEva + this.teacherEva + this.mutEva;
    });
  }

}
