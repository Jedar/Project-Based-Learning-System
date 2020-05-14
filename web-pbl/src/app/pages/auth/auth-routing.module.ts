import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExampleComponent } from './example/example.component';
import { AuthMainComponent } from './auth-main/auth-main.component';


const routes: Routes = [
  {path: '', component: AuthMainComponent, children:[
    {path:'', redirectTo:'example'},
    {path:'example',component: ExampleComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
