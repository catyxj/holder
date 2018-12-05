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
  ],
  exports: [
    // RouterModule
  ]
})
export class ModulesModule { }
