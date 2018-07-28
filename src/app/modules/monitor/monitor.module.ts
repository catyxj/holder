import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ListComponent } from './list/list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';
import { MonitorRoutingModule } from './monitor-routing.module';
import {BaiduMapModule} from 'angular2-baidu-map';
import {FormsModule} from "@angular/forms";
import { MapGeneralComponent } from './map-general/map-general.component';
import { MapBatchComponent } from './map-batch/map-batch.component';
import {NgZorroAntdModule} from "ng-zorro-antd";


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    NgZorroAntdModule,
    RouterModule.forChild(MonitorRoutingModule)
  ],
  declarations: [
    ListComponent,
    DashboardComponent,
    MapComponent,
    MapGeneralComponent,
    MapBatchComponent
  ],
  exports: [
    // RouterModule
  ]
})
export class MonitorModule { }
