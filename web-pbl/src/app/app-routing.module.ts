import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageErrorComponent } from './components/page-error/page-error.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { path: '404', component: PageErrorComponent},
  { path: '**', redirectTo:'404'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
