
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
import { RemindListComponent } from './home/remind/remind-list/remind-list.component';
import { RemindReportComponent } from './home/remind/remind-report/remind-report.component';
import { RemindOverdue1Component } from './home/remind/remind-overdue1/remind-overdue1.component';
import { RemindOverdue2Component } from './home/remind/remind-overdue2/remind-overdue2.component';
import { RemindOverdue3Component } from './home/remind/remind-overdue3/remind-overdue3.component';
import { RemindReportMainComponent } from './home/remind/remind-report-main/remind-report-main.component';
import { RuntimeMainComponent } from './runtime/runtime-main/runtime-main.component';
import { EqListAddComponent } from './monitor/list/modals/eq-list-add/eq-list-add.component';
import { EqBatchComponent } from './monitor/list/eq-batch/eq-batch.component';
import { RuntimeDashboardComponent } from './runtime/runtime-dashboard/runtime-dashboard.component';
import { RuntimeAlarmMainComponent } from './runtime/alarm/runtime-alarm-main/runtime-alarm-main.component';
import { EquipInfoOrComponent } from './runtime/equip/equip-info-or/equip-info-or.component';
import { CluBatchComponent } from './monitor/cluster/clu-batch/clu-batch.component';
import { CluAddMainComponent } from './monitor/cluster/add/clu-add-main/clu-add-main.component';
import { CluAddCluComponent } from './monitor/cluster/add/clu-add-clu/clu-add-clu.component';
import { CluAddEptComponent } from './monitor/cluster/add/clu-add-ept/clu-add-ept.component';
import { CluAddFinishComponent } from './monitor/cluster/add/clu-add-finish/clu-add-finish.component';
import { CluInfoComponent } from './monitor/cluster/clu-info/clu-info.component';
import { CluEptAddComponent } from './monitor/cluster/ept/clu-ept-add/clu-ept-add.component';
import { CluEptDelComponent } from './monitor/cluster/ept/clu-ept-del/clu-ept-del.component';
import { CluBasicEditComponent } from './monitor/cluster/modals/clu-basic-edit/clu-basic-edit.component';
import { RuntimeMaintainComponent } from './runtime/maintain/runtime-maintain/runtime-maintain.component';
import { RuntimeCycleComponent } from './runtime/cycle/runtime-cycle/runtime-cycle.component';
import { RuntimeVideoComponent } from './runtime/video/runtime-video/runtime-video.component';
import { EqBasicEditComponent } from './runtime/equip/modals/eq-basic-edit/eq-basic-edit.component';
import { EqAddressEditComponent } from './runtime/equip/modals/eq-address-edit/eq-address-edit.component';
import { EqChartsComponent } from './runtime/equip/eq-charts/eq-charts.component';


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
    RemindListComponent,
    RemindReportComponent,
    RemindOverdue1Component,
    RemindOverdue2Component,
    RemindOverdue3Component,
    RemindReportMainComponent,
    RuntimeMainComponent,
    EqListAddComponent,
    EqBatchComponent,
    RuntimeDashboardComponent,
    RuntimeAlarmMainComponent,
    EquipInfoOrComponent,
    CluBatchComponent,
    CluAddMainComponent,
    CluAddCluComponent,
    CluAddEptComponent,
    CluAddFinishComponent,
    CluInfoComponent,
    CluEptAddComponent,
    CluEptDelComponent,
    CluBasicEditComponent,
    RuntimeMaintainComponent,
    RuntimeCycleComponent,
    RuntimeVideoComponent,
    EqBasicEditComponent,
    EqAddressEditComponent,
    EqChartsComponent,

  ],
  exports: [

  ],
  entryComponents: [
    EqListAddComponent,
    CluBasicEditComponent,
    EqBasicEditComponent,
    EqAddressEditComponent,
  ]
})
export class OrdinaryModule { }
