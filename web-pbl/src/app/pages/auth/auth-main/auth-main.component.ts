import { Component, OnInit } from '@angular/core';

import { HeaderLogoComponent } from '../../../components/header-logo/header-logo.component';
import { FooterContentComponent } from '../../../components/footer-content/footer-content.component';

@Component({
  selector: 'app-auth-main',
  templateUrl: './auth-main.component.html',
  styleUrls: ['./auth-main.component.css']
})
export class AuthMainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
