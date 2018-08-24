import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuntimeDashboardComponent } from './dashboard/dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import {RuntimeRoutingModule} from "./runtime-routing.module";
import {RouterModule} from "@angular/router";
import { OperateComponent } from './operate/operate.component';
import { RuntimeHistoryComponent } from './history/history.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {NgZorroAntdModule} from "ng-zorro-antd";
import { RuntimeAlarmComponent } from './alarm/alarm.component';
import { AlarmCurrentComponent } from './alarm-current/alarm-current.component';
import { AlarmHistoryComponent } from './alarm-history/alarm-history.component';
import { MaintainComponent } from './maintain/maintain.component';
import {ModulesModule} from "../modules.module";



@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule,
    NgbModule,
    FormsModule,
    NgZorroAntdModule,
    RouterModule.forChild(RuntimeRoutingModule)
  ],
  declarations: [
    RuntimeDashboardComponent,
    OperateComponent,
    RuntimeHistoryComponent,
    RuntimeAlarmComponent,
    AlarmCurrentComponent,
    AlarmHistoryComponent,
    MaintainComponent
  ],
  entryComponents: [
  ]
})
export class RuntimeModule { }
