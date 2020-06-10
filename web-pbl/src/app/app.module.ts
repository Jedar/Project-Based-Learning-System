import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { PageErrorComponent } from './components/page-error/page-error.component';
import { AppShareModule } from './app-share.module';
import { AuthService } from './services/auth.service';
import { TaskService } from './services/task.service';
import { StudentService } from './services/student.service';
import { ProjectService } from './services/project.service';
import { FileService } from './services/file.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import {NzMessageService} from "ng-zorro-antd";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    PageErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule,
    AppShareModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: NZ_I18N, useValue: zh_CN },
    AuthService,
    TaskService,
    StudentService,
    NzModalService,
    NzMessageService,
    ProjectService,
    FileService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
