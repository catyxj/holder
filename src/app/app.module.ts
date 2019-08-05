import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import {NotFound404Component} from './global/not-found404/not-found404.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import zh from '@angular/common/locales/zh';
import {NgxEchartsModule} from 'ngx-echarts';
import {BsDatepickerModule} from 'ngx-bootstrap';


import {HeaderComponent} from './global/header/header.component';
import {FooterComponent} from './global/footer/footer.component';
import {SidebarComponent} from './global/sidebar/sidebar.component';
import { RuikongComponent } from './homepage/ruikong/ruikong.component';
import { QiantianComponent } from './homepage/qiantian/qiantian.component';
import { SignUpComponent } from './register/sign-up/sign-up.component';
import { RecoverPasswordComponent } from './register/recover-password/recover-password.component';
import { DirMainComponent } from './modules/directives/dir-main/dir-main.component';
import { SignInComponent } from './register/sign-in/sign-in.component';
import { VideoLiveComponent } from './modules/directives/video-live/video-live.component';

import {AdminModule} from './modules/admin/admin.module';

import { ComfirmComponent } from './modules/directives/alert/comfirm/comfirm.component';
import { ErrorComponent } from './modules/directives/alert/error/error.component';
import {FormalModule} from "./modules/formal/formal.module";



registerLocaleData(zh);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    NotFound404Component,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    QiantianComponent,
    RuikongComponent,
    SignUpComponent,
    RecoverPasswordComponent,
    DirMainComponent,
    SignInComponent,
    ComfirmComponent,
    ErrorComponent,
    VideoLiveComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AngularFontAwesomeModule,
    NgZorroAntdModule,
    NgxEchartsModule,
    AdminModule,
  ],
  entryComponents: [
    ComfirmComponent
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: NZ_I18N, useValue: zh_CN },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
