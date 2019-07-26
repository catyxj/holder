
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
          }
        ]
      },
      {
        path: 'account',
        component: AcMainOrdComponent,
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          {
            path: 'info',
            component: AcInfoOrdComponent,
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
          }
        ]
      }
    ]
  }
];
