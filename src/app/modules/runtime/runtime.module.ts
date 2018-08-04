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
    RuntimeHistoryComponent
  ]
})
export class RuntimeModule { }
