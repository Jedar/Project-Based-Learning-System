import { NgModule } from '@angular/core';
import { HeaderLogoComponent } from './components/header-logo/header-logo.component';
import { FooterContentComponent } from './components/footer-content/footer-content.component';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';

@NgModule({
  declarations: [
    HeaderLogoComponent,
    FooterContentComponent,
  ],
  imports: [
    DemoNgZorroAntdModule,
  ],
  exports: [
    HeaderLogoComponent,
    FooterContentComponent,
  ],
})
export class AppShareModule { }
