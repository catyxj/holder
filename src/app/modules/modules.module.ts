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



@NgModule({
  imports: [
    CommonModule,
    MonitorModule,
    BoilersModule,
    RuntimeModule,
    RouterModule.forChild(ModulesRoutingModule),
    NgxEchartsModule
  ],
  declarations: [
    MonitorMainComponent,
    BoilerMainComponent,
    RuntimeMainComponent
  ],
  exports: [
    // RouterModule
  ]
})
export class ModulesModule { }
