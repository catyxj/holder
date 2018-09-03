import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatMenuModule } from '@angular/material';
import { SidebarComponent } from './sidebar/sidebar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {GlobalRoutingModule} from './global-routing.module';

import {NgZorroAntdModule} from "ng-zorro-antd";
import {RuntimeModule} from "../modules/runtime/runtime.module";
import {UserAccountModule} from "../modules/user-account/user-account.module";
import {OrganizationModule} from "../modules/organization/organization.module";

import {AlarmModule} from "../modules/alarm/alarm.module";
import {UploadModule} from "../modules/upload/upload.module";
import {MaintainModule} from "../modules/maintain/maintain.module";
import {NgxEchartsModule} from "ngx-echarts";



@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    // MonitorModule,
    // BoilersModule,
    RuntimeModule,
    // ProfileModule,
    UserAccountModule,
    OrganizationModule,
    // TerminalModule,
    // ClusterModule,
    // TemplateModule,
    AlarmModule,
    UploadModule,
    MaintainModule,
    RouterModule.forChild( GlobalRoutingModule ),
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    NgxEchartsModule,
    NgbModule,
    NgZorroAntdModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,

  ]
})
export class GlobalModule { }
