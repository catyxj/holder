import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuntimeDashboardComponent } from './dashboard/dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import {RuntimeRoutingModule} from "./runtime-routing.module";
import {RouterModule} from "@angular/router";


@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule,
    RouterModule.forChild(RuntimeRoutingModule)
  ],
  declarations: [
    RuntimeDashboardComponent
  ]
})
export class RuntimeModule { }
