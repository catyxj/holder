
import {MainOrdComponent} from "./main-ord/main-ord.component";
import {HomeMainOrdComponent} from "./home/home-main-ord/home-main-ord.component";
import {GraphicMainComponent} from "./monitor/graphic/graphic-main/graphic-main.component";
import {GraphicDashboardComponent} from "./monitor/graphic/graphic-dashboard/graphic-dashboard.component";
import {HomeDashboardComponent} from "./home/home-dashboard/home-dashboard.component";
import {EqListMainComponent} from "./monitor/list/eq-list-main/eq-list-main.component";
import {EqListListComponent} from "./monitor/list/eq-list-list/eq-list-list.component";
import {MapMainComponent} from "./monitor/map/map-main/map-main.component";
import {MapDashboardComponent} from "./monitor/map/map-dashboard/map-dashboard.component";
import {AcMainOrdComponent} from "./account/ac-main-ord/ac-main-ord.component";
import {AcInfoOrdComponent} from "./account/ac-info-ord/ac-info-ord.component";
import {ServiceListOrdComponent} from "./service/service-list-ord/service-list-ord.component";
import {ServiceMainOrdComponent} from "./service/service-main-ord/service-main-ord.component";
import {CluMainComponent} from "./monitor/cluster/clu-main/clu-main.component";
import {CluDashboardComponent} from "./monitor/cluster/clu-dashboard/clu-dashboard.component";
import {RemindListComponent} from "./home/remind/remind-list/remind-list.component";
import {RemindReportMainComponent} from "./home/remind/remind-report-main/remind-report-main.component";
import {EqBatchComponent} from "./monitor/list/eq-batch/eq-batch.component";
import {RuntimeMainComponent} from "./runtime/runtime-main/runtime-main.component";
import {RuntimeDashboardComponent} from "./runtime/runtime-dashboard/runtime-dashboard.component";
import {RuntimeAlarmMainComponent} from "./runtime/alarm/runtime-alarm-main/runtime-alarm-main.component";
import {CluAddMainComponent} from "./monitor/cluster/add/clu-add-main/clu-add-main.component";
import {CluBatchComponent} from "./monitor/cluster/clu-batch/clu-batch.component";
import {CluInfoComponent} from "./monitor/cluster/clu-info/clu-info.component";
import {CluEptAddComponent} from "./monitor/cluster/ept/clu-ept-add/clu-ept-add.component";
import {CluEptDelComponent} from "./monitor/cluster/ept/clu-ept-del/clu-ept-del.component";
import {RuntimeMaintainComponent} from "./runtime/maintain/runtime-maintain/runtime-maintain.component";
import {RuntimeCycleComponent} from "./runtime/cycle/runtime-cycle/runtime-cycle.component";
import {RuntimeVideoComponent} from "./runtime/video/runtime-video/runtime-video.component";
import {EquipInfoOrComponent} from "./runtime/equip/equip-info-or/equip-info-or.component";
import {EqChartsComponent} from "./runtime/equip/eq-charts/eq-charts.component";
import {EqHistoryComponent} from "./runtime/equip/eq-history/eq-history.component";
import {NoticeListComponent} from "./home/notice/notice-list/notice-list.component";
import {NoticeReportMainComponent} from "./home/notice/notice-report-main/notice-report-main.component";
import {ServiceInfoOrComponent} from "./service/service-info-or/service-info-or.component";
import {ServiceDetailOrComponent} from "./service/service-detail-or/service-detail-or.component";
import {AcOperateOrdComponent} from "./account/ac-operate-ord/ac-operate-ord.component";

export const OrdinaryRoutingModule = [
  {
    path: '',
    component: MainOrdComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeMainOrdComponent,
        children: [
          { path: '', redirectTo: 'dashborad', pathMatch: 'full' },
          {
            path: 'dashborad',
            component: HomeDashboardComponent
          },
          {
            path: 'remind',
            component: RemindListComponent
          },
          {
            path: 'remind-info/:uid/:type',
            component: RemindReportMainComponent
          },
          {
            path: 'notice',
            component: NoticeListComponent
          },
          {
            path: 'notice-info/:uid/:type/:status',
            component: NoticeReportMainComponent
          }
        ]
      },
      {
        path: 'graphic',
        component: GraphicMainComponent,
        children: [
          { path: '', redirectTo: 'dashborad', pathMatch: 'full' },
          {
            path: 'dashborad',
            component: GraphicDashboardComponent,
          }
        ]
      },
      {
        path: 'equip-list',
        component: EqListMainComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: EqListListComponent,
          },
          {
            path: 'batch',
            component: EqBatchComponent,
          }
        ]
      },
      {
        path: 'map',
        component: MapMainComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            component: MapDashboardComponent,
          }
        ]
      },
      {
        path: 'cluster',
        component: CluMainComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            component: CluDashboardComponent,
          },
          {
            path: 'add',
            component: CluAddMainComponent
          },
          {
            path: 'batch',
            component: CluBatchComponent
          },
          {
            path: 'info/:uid/:page',
            component: CluInfoComponent
          },
          {
            path: 'ept-add/:uid',
            component: CluEptAddComponent
          },
          {
            path: 'ept-del/:uid',
            component: CluEptDelComponent
          }
        ]
      },
      {
        path: 'runtime/:uid',
        component: RuntimeMainComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            component: RuntimeDashboardComponent,
          },
          {
            path: 'alarm',
            component: RuntimeAlarmMainComponent,
          },
          {
            path: 'maintain',
            component: RuntimeMaintainComponent,
          },
          {
            path: 'cycle',
            component: RuntimeCycleComponent,
          },
          {
            path: 'video',
            component: RuntimeVideoComponent,
          }
        ]
      },
      {
        path: 'equip-info/:uid',
        component: EquipInfoOrComponent,
      },
      {
        path: 'equip-charts/:uid',
        component: EqChartsComponent,
      },
      {
        path: 'equip-history/:uid',
        component: EqHistoryComponent,
      },
      {
        path: 'account',
        component: AcMainOrdComponent,
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          {
            path: 'info',
            component: AcInfoOrdComponent,
          },
          {
            path: 'operate/:uid',
            component: AcOperateOrdComponent,
          }
        ]
      },
      {
        path: 'service',
        component: ServiceMainOrdComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: ServiceListOrdComponent,
          },
          {
            path: 'info',
            component: ServiceInfoOrComponent
          },
          {
            path: 'detail/:uid/:page',
            component: ServiceDetailOrComponent
          }
        ]
      }
    ]
  }
];
