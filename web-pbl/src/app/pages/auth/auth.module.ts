import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ExampleComponent } from './example/example.component';
import { AuthMainComponent } from './auth-main/auth-main.component';


@NgModule({
  declarations: [ExampleComponent, AuthMainComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
