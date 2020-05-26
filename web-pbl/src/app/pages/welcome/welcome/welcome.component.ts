import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  val1=0;
  val2=0;
  val3=0;
  total=100;

  formatterPercent = (value: number) => `${value} %`;
  parserPercent = (value: string) => value.replace(' %', '');

  constructor() { }

  ngOnInit(): void {
  }

  increase1(){
    if(this.total > 0){
      this.val1+=10;
      this.total-=10;
    }
  }

  decrease1(){
    if(this.val1 > 0){
      this.val1-=10;
      this.total+=10;
    }
  }

  increase2(){
    if(this.total > 0){
      this.val2+=10;
      this.total-=10;
    }
  }

  decrease2(){
    if(this.val2 > 0){
      this.val2-=10;
      this.total+=10;
    }
  }

  increase3(){
    if(this.total > 0){
      this.val3+=10;
      this.total-=10;
    }
  }

  decrease3(){
    if(this.val3 > 0){
      this.val3-=10;
      this.total+=10;
    }
  }

}
