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
import { ClusterDashboardComponent } from './cluster-dashboard/cluster-dashboard.component';
import { CluEquiplistComponent } from './clu-equiplist/clu-equiplist.component';
import {MonitorMainComponent} from "./monitor-main/monitor-main.component";


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    NgZorroAntdModule,
    RouterModule.forChild(MonitorRoutingModule)
  ],
  declarations: [
    MonitorMainComponent,
    ListComponent,
    DashboardComponent,
    MapComponent,
    MapGeneralComponent,
    MapBatchComponent,
    ClusterDashboardComponent,
    CluEquiplistComponent
  ],
  exports: [
    // RouterModule
  ]
})
export class MonitorModule { }
