import { Component, OnInit } from '@angular/core';
import {Student} from "../../../share/student.model";
import {StudentService} from "../../../services/student.service";
import {ActivatedRoute} from "@angular/router";
import {Participate} from "../../../share/participate.model";
import {ScoreService} from "../../../services/score.service";

@Component({
  selector: 'app-pj-mark-score',
  templateUrl: './pj-mark-score.component.html',
  styleUrls: ['./pj-mark-score.component.css']
})
export class PjMarkScoreComponent implements OnInit {
  students: Student[] = [];
  projectId:number;
  participates:Participate[] = [];

  constructor(
    private studentService:StudentService,
    private activatedRoute: ActivatedRoute,
    private scoreService:ScoreService,
  ) {
    activatedRoute.params.subscribe(params => {
    this.projectId = params['projectId'];
  });
  }

  ngOnInit(): void {
    this.studentService.getStudentsOfProject(this.projectId).subscribe(result => {
      this.students = result;
    });

    this.scoreService.getScores().subscribe(result=>{
      this.participates = result;
    })
  }

  onSubmit(){

  }

}
