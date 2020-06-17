import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TokenHandler} from "../../../share/Token";
import {AuthService} from "../../../services/auth.service";
import { MemoService } from '../../../services/memo.service';

@Component({
  selector: 'app-student-main',
  templateUrl: './student-main.component.html',
  styleUrls: ['./student-main.component.css']
})
export class StudentMainComponent implements OnInit {

  option:string;

  memoCount:number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private memoService: MemoService
  ) { }

  ngOnInit(): void {
    let res = this.route;
    if(!this.authService.getUserId()){
      this.router.navigate(['/','auth']);
    }
    let role = this.authService.getRoleType();
    if(!role || role != 2){
      this.router.navigate(['/','auth','student','login']);
    }

    this.route.parent.url.subscribe(url => {
      res.children[0].url.subscribe(u => {
        this.option = u[0].path;
      });
    });

    this.memoService.memoCount(this.authService.getUserId()).subscribe(result => {
      if(result.code == 200){
        this.memoCount = result.data;
      }
      else{
        window.alert(result.message);
      }
    })
  }
  logout(){
    this.authService.setUserId(null);
    new TokenHandler().deleteToken();
    this.router.navigateByUrl("/auth/student/login");
  }

}
