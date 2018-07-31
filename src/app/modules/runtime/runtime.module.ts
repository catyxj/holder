import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuntimeDashboardComponent } from './dashboard/dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import {RuntimeRoutingModule} from "./runtime-routing.module";
import {RouterModule} from "@angular/router";
import { OperateComponent } from './operate/operate.component';
import { RuntimeHistoryComponent } from './history/history.component';


@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule,
    RouterModule.forChild(RuntimeRoutingModule)
  ],
  declarations: [
    RuntimeDashboardComponent,
    OperateComponent,
    RuntimeHistoryComponent
  ]
})
export class RuntimeModule { }
