import { Component, OnInit } from '@angular/core';


import { ActivatedRoute,Router } from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import {TokenHandler} from "../../../share/Token";

@Component({
  selector: 'app-manager-main',
  templateUrl: './manager-main.component.html',
  styleUrls: ['./manager-main.component.css']
})
export class ManagerMainComponent implements OnInit {
  option:string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    let res = this.route;

    this.route.parent.url.subscribe(url => {
      res.children[0].url.subscribe(u => {
        this.option = u[0].path;
      });

    });
  }

  logout(){
    this.authService.setUserId(null);
    new TokenHandler().deleteToken();
    this.router.navigateByUrl("/auth/manager/login");
  }

}
