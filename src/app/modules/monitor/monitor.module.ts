import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ListComponent } from './list/list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';
import { MonitorRoutingModule } from './monitor-routing.module';
import {BaiduMapModule} from 'angular2-baidu-map';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(MonitorRoutingModule),
    BaiduMapModule.forRoot({ak: 'bDCh2N15YYodpt1wns4YPC7XFynjDx60'})
  ],
  declarations: [
    ListComponent,
    DashboardComponent,
    MapComponent
  ],
  exports: [
    // RouterModule
  ]
})
export class MonitorModule { }
