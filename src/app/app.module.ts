import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { GlobalModule } from './global/global.module';
import { ModulesModule } from './modules/modules.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import {NotFound404Component} from './global/not-found404/not-found404.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {BaiduMapModule} from 'angular2-baidu-map';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    NotFound404Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    GlobalModule,
    ModulesModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AngularFontAwesomeModule,
    FormsModule,
    BaiduMapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
