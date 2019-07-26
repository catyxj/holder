
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutModule} from '@angular/cdk/layout';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';

import {OrdinaryRoutingModule} from "./ordinary-routing.module";
import {MainOrdComponent} from './main-ord/main-ord.component';
import { HomeMainOrdComponent } from './home/home-main-ord/home-main-ord.component';
import { GraphicMainComponent } from './monitor/graphic/graphic-main/graphic-main.component';
import { GraphicDashboardComponent } from './monitor/graphic/graphic-dashboard/graphic-dashboard.component';
import { EqListMainComponent } from './monitor/list/eq-list-main/eq-list-main.component';
import { EqListListComponent } from './monitor/list/eq-list-list/eq-list-list.component';
import { MapMainComponent } from './monitor/map/map-main/map-main.component';
import { MapDashboardComponent } from './monitor/map/map-dashboard/map-dashboard.component';
import { CluMainComponent } from './monitor/cluster/clu-main/clu-main.component';
import { CluDashboardComponent } from './monitor/cluster/clu-dashboard/clu-dashboard.component';
import { AcMainOrdComponent } from './account/ac-main-ord/ac-main-ord.component';
import { AcInfoOrdComponent } from './account/ac-info-ord/ac-info-ord.component';
import { ServiceMainOrdComponent } from './service/service-main-ord/service-main-ord.component';
import { ServiceListOrdComponent } from './service/service-list-ord/service-list-ord.component';
import { HomeDashboardComponent } from './home/home-dashboard/home-dashboard.component';


@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    RouterModule.forChild( OrdinaryRoutingModule ),
    NgbModule,
    NgZorroAntdModule,
  ],
  declarations: [
    MainOrdComponent,
    HomeMainOrdComponent,
    HomeDashboardComponent,
    GraphicMainComponent,
    GraphicDashboardComponent,
    EqListMainComponent,
    EqListListComponent,
    MapMainComponent,
    MapDashboardComponent,
    CluMainComponent,
    CluDashboardComponent,
    AcMainOrdComponent,
    AcInfoOrdComponent,
    ServiceMainOrdComponent,
    ServiceListOrdComponent,

  ],
  exports: [

  ]
})
export class OrdinaryModule { }
