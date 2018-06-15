import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MonitorModule } from './monitor/monitor.module';
import {BoilersModule} from './boilers/boilers.module';


import { ModulesRoutingModule } from './modules-routing.module';
import {MonitorMainComponent} from './monitor/monitor-main/monitor-main.component';



@NgModule({
  imports: [
    CommonModule,
    MonitorModule,
    BoilersModule,
    ModulesRoutingModule
  ],
  declarations: [
    MonitorMainComponent
  ],
  exports: [
    RouterModule
  ]
})
export class ModulesModule { }
