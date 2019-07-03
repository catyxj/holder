import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MonitorModule } from './monitor/monitor.module';
import {BoilersModule} from './boilers/boilers.module';


import { ModulesRoutingModule } from './modules-routing.module';
import {MonitorMainComponent} from './monitor/monitor-main/monitor-main.component';
import {BoilerMainComponent} from './boilers/boiler-main/boiler-main.component';
import {RuntimeModule} from './runtime/runtime.module';
import {RuntimeMainComponent} from './runtime/runtime-main/runtime-main.component';
import {NgxEchartsModule} from 'ngx-echarts';
import {OrgMainComponent} from './organization/org-main/org-main.component';
import {ProfileMainComponent} from './profile/profile-main/profile-main.component';
import {ProfileModule} from './profile/profile.module';
import {UserMainComponent} from './user-account/user-main/user-main.component';
import {UserAccountModule} from './user-account/user-account.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {OrganizationModule} from './organization/organization.module';
import {TerminalModule} from './terminal/terminal.module';
import {TerminalMainComponent} from './terminal/terminal-main/terminal-main.component';
import {ClusterMainComponent} from './cluster/cluster-main/cluster-main.component';
import {ClusterModule} from './cluster/cluster.module';
import {TemplateMainComponent} from './template/template-main/template-main.component';
import {TemplateModule} from './template/template.module';
import {AlarmMainComponent} from './alarm/alarm-main/alarm-main.component';
import {AlarmModule} from './alarm/alarm.module';
import {MaintainMainComponent} from './maintain/maintain-main/maintain-main.component';
import {UploadMainComponent} from './upload/upload-main/upload-main.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {UploadModule} from './upload/upload.module';
import {MaintainModule} from './maintain/maintain.module';
import { OverviewMainComponent } from './overview/overview-main/overview-main.component';
import { ViewListComponent } from './overview/view-list/view-list.component';
import { ViewConfigComponent } from './overview/view-config/view-config.component';
import {AddEquipComponent} from './overview/add-equip/add-equip.component';
import {AddTermComponent} from './overview/add-term/add-term.component';
import {AddTemplateComponent} from './overview/add-template/add-template.component';
import {MatGridListModule, MatMenuModule} from '@angular/material';
import {MalfunctionMainComponent} from './malfunction/malfunction-main/malfunction-main.component';
import {MalfunctionModule} from './malfunction/malfunction.module';
import { ServiceMainComponent } from './service/service-main/service-main.component';
import { ServiceListComponent } from './service/service-list/service-list.component';
import { ServiceDashboardComponent } from './service/service-dashboard/service-dashboard.component';
import { SerDashboard2Component } from './service/ser-dashboard2/ser-dashboard2.component';
import { SerDashboard3Component } from './service/ser-dashboard3/ser-dashboard3.component';
import { SerAddComponent } from './service/ser-add/ser-add.component';
import { SerViewComponent } from './service/ser-view/ser-view.component';
import { AttendanceMainComponent } from './attendance/attendance-main/attendance-main.component';
import { AttendanceListComponent } from './attendance/attendance-list/attendance-list.component';
import { BlueMainComponent } from './bluetooth/blue-main/blue-main.component';
import { BlueListComponent } from './bluetooth/blue-list/blue-list.component';
import { BlueEditComponent } from './bluetooth/blue-edit/blue-edit.component';
import { BlueBindEqComponent } from './bluetooth/blue-bind-eq/blue-bind-eq.component';
import { BlueAddComponent } from './bluetooth/blue-add/blue-add.component';
import { VideoMainComponent } from './video/video-main/video-main.component';
import { VideoListComponent } from './video/video-list/video-list.component';
import { VideoAddComponent } from './video/video-add/video-add.component';
import { VideoConfigComponent } from './video/video-config/video-config.component';
import { FaceMainComponent } from './face-rec/face-main/face-main.component';
import { FaceListComponent } from './face-rec/face-list/face-list.component';
import { FaceAddComponent } from './face-rec/face-add/face-add.component';
import { FaceRecListComponent } from './face-rec/face-rec-list/face-rec-list.component';
import { RecEditComponent } from './face-rec/rec-edit/rec-edit.component';
import { FaceViewComponent } from './face-rec/face-view/face-view.component';
import { VideoViewComponent } from './video/video-view/video-view.component';
import { ChargeMainComponent } from './recharge/charge-main/charge-main.component';
import { Charge1Component } from './recharge/charge1/charge1.component';
import { HomeMainComponent } from './home/home-main/home-main.component';
import { HomeGeneralComponent } from './home/home-general/home-general.component';
import { HomeVipComponent } from './home/home-vip/home-vip.component';







@NgModule({
  imports: [
    CommonModule,
    MonitorModule,
    BoilersModule,
    RuntimeModule,
    ProfileModule,
    UserAccountModule,
    OrganizationModule,
    TerminalModule,
    ClusterModule,
    TemplateModule,
    AlarmModule,
    UploadModule,
    MaintainModule,
    MalfunctionModule,
    NgZorroAntdModule,
    RouterModule.forChild(ModulesRoutingModule),
    NgxEchartsModule,
    FormsModule,
    NgbModule,
    MatMenuModule,
    MatGridListModule,
  ],
  declarations: [
    MonitorMainComponent,
    BoilerMainComponent,
    RuntimeMainComponent,
    OrgMainComponent,
    ProfileMainComponent,
    UserMainComponent,
    TerminalMainComponent,
    ClusterMainComponent,
    TemplateMainComponent,
    AlarmMainComponent,
    MaintainMainComponent,
    UploadMainComponent,
    OverviewMainComponent,
    ViewListComponent,
    ViewConfigComponent,
    AddEquipComponent,
    AddTermComponent,
    AddTemplateComponent,
    MalfunctionMainComponent,
    ServiceMainComponent,
    ServiceListComponent,
    ServiceDashboardComponent,
    SerDashboard2Component,
    SerDashboard3Component,
    SerAddComponent,
    SerViewComponent,
    AttendanceMainComponent,
    AttendanceListComponent,
    BlueMainComponent,
    BlueListComponent,
    BlueEditComponent,
    BlueBindEqComponent,
    BlueAddComponent,
    VideoMainComponent,
    VideoListComponent,
    VideoAddComponent,
    VideoConfigComponent,
    FaceMainComponent,
    FaceListComponent,
    FaceAddComponent,
    FaceRecListComponent,
    RecEditComponent,
    FaceViewComponent,
    VideoViewComponent,
    ChargeMainComponent,
    Charge1Component,
    HomeMainComponent,
    HomeGeneralComponent,
    HomeVipComponent,

  ],
  exports: [
    // RouterModule
  ],
  entryComponents: [
    SerAddComponent,
    BlueEditComponent,
    BlueBindEqComponent,
    BlueAddComponent,
    VideoAddComponent,
    VideoConfigComponent,
    FaceAddComponent,
    RecEditComponent,
    FaceViewComponent,
    VideoViewComponent
  ]
})
export class ModulesModule { }
