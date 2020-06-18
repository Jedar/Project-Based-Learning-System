import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private router: Router) { }

  goToUnauthorizedPage(): void {
    this.router.navigate(['401']);
  }
}
