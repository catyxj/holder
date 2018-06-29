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



@NgModule({
  imports: [
    CommonModule,
    MonitorModule,
    BoilersModule,
    RuntimeModule,
    ProfileModule,
    UserAccountModule,
    RouterModule.forChild(ModulesRoutingModule),
    NgxEchartsModule
  ],
  declarations: [
    MonitorMainComponent,
    BoilerMainComponent,
    RuntimeMainComponent,
    OrgMainComponent,
    ProfileMainComponent,
    UserMainComponent
  ],
  exports: [
    // RouterModule
  ]
})
export class ModulesModule { }
