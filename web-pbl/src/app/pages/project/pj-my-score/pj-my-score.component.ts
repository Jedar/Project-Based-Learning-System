import {Component, OnInit} from '@angular/core';
import {Participate} from "../../../share/participate.model";
import {ScoreService} from "../../../services/score.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pj-my-score',
  templateUrl: './pj-my-score.component.html',
  styleUrls: ['./pj-my-score.component.css']
})
export class PjMyScoreComponent implements OnInit {
  participate: Participate[] = [];
  project_id: number;
  totalScore: number = 0;
  selfEva: number = 0;//自评
  mutEva: number = 0;//互评
  teacherEva: number = 0;//教师评价

  constructor(
    private scoreService: ScoreService,
    private activatedRoute: ActivatedRoute,
  ) {
    activatedRoute.params.subscribe(params => {
      this.project_id = params['projectId'];
    });
  }

  ngOnInit(): void {
    this.scoreService.getScores().subscribe(result => {
      this.participate = result;
      for (let score of this.participate) {
        let s = score.distribute * score.value;
        switch (score.score_type) {
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
