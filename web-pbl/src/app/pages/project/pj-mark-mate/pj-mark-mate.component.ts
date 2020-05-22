import {Component, OnInit} from '@angular/core';
import {Student} from "../../../share/student.model";
import {StudentService} from "../../../services/student.service";
import {ActivatedRoute} from "@angular/router";
import {Participate} from "../../../share/participate.model";
import {ScoreService} from "../../../services/score.service";

@Component({
  selector: 'app-pj-mark-mate',
  templateUrl: './pj-mark-mate.component.html',
  styleUrls: ['./pj-mark-mate.component.css']
})
export class PjMarkMateComponent implements OnInit {
  selfEva: number = 0;
  students: Student[] = [];
  projectId:number;
  participates:Participate[] = [];

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private scoreService:ScoreService,
  ) {
    activatedRoute.params.subscribe(params => {
      this.projectId = params['projectId'];
    });
  }

  onSubmit() {

  }

  ngOnInit(): void {
    this.studentService.getStudentsOfProject(this.projectId).subscribe(result => {
      this.students = result;
    });
    this.scoreService.getScores().subscribe(result=>{
      this.participates = result;
    })
  }

}
