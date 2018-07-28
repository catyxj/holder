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
import {ClusterModule} from "./cluster/cluster.module";
import {TemplateMainComponent} from "./template/template-main/template-main.component";
import {TemplateModule} from "./template/template.module";
import {AlarmMainComponent} from "./alarm/alarm-main/alarm-main.component";
import {AlarmModule} from "./alarm/alarm.module";



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
    RouterModule.forChild(ModulesRoutingModule),
    NgxEchartsModule,
    FormsModule,
    NgbModule
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
    AlarmMainComponent
  ],
  exports: [
    // RouterModule
  ]
})
export class ModulesModule { }
