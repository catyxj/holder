import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from '../main/main.component';

import { MonitorMainComponent } from './monitor/monitor-main/monitor-main.component';
import {DashboardComponent} from './monitor/dashboard/dashboard.component';
import {ListComponent} from './monitor/list/list.component';
import {BoilerMainComponent} from './boilers/boiler-main/boiler-main.component';
import {BoilersComponent} from './boilers/boilers/boilers.component';
import {BoilerInfoComponent} from './boilers/boiler-info/boiler-info.component';
import {RuntimeMainComponent} from './runtime/runtime-main/runtime-main.component';
import {MapComponent} from './monitor/map/map.component';
import {OrgMainComponent} from './organization/org-main/org-main.component';
import {ProfileMainComponent} from './profile/profile-main/profile-main.component';
import {PortraitComponent} from './profile/portrait/portrait.component';
import {InfoComponent} from './profile/info/info.component';
import {PasswordComponent} from './profile/password/password.component';
import {UserloginGuard} from '../shared/userlogin.guard';
import {UserMainComponent} from './user-account/user-main/user-main.component';
import {TerminalMainComponent} from './terminal/terminal-main/terminal-main.component';
import {TerminalListComponent} from './terminal/terminal-list/terminal-list.component';
import {TerConfigComponent} from './terminal/ter-config/ter-config.component';
import {MessagesComponent} from './terminal/messages/messages.component';
import {ClusterMainComponent} from './cluster/cluster-main/cluster-main.component';
import {ClusterListComponent} from "./cluster/cluster-list/cluster-list.component";
import {ClusterDetailComponent} from "./cluster/cluster-detail/cluster-detail.component";
import {TemplateMainComponent} from "./template/template-main/template-main.component";
import {TemplateListComponent} from "./template/template-list/template-list.component";
import {EditTempComponent} from "./template/edit-temp/edit-temp.component";
import {AlarmMainComponent} from "./alarm/alarm-main/alarm-main.component";
import {CurrentComponent} from "./alarm/current/current.component";
import {HistoryComponent} from "./alarm/history/history.component";
import {MapGeneralComponent} from "./monitor/map-general/map-general.component";
import {MapBatchComponent} from "./monitor/map-batch/map-batch.component";
import {RuntimeDashboardComponent} from "./runtime/dashboard/dashboard.component";
import {CluEquiplistComponent} from "./monitor/clu-equiplist/clu-equiplist.component";
import {ClusterDashboardComponent} from "./monitor/cluster-dashboard/cluster-dashboard.component";
import {OperateComponent} from "./runtime/operate/operate.component";
import {RuntimeHistoryComponent} from "./runtime/history/history.component";
import {RuntimeAlarmComponent} from "./runtime/alarm/alarm.component";
import {AlarmHistoryComponent} from "./runtime/alarm-history/alarm-history.component";
import {AlarmCurrentComponent} from "./runtime/alarm-current/alarm-current.component";
import {BoilerTemplatesComponent} from "./boilers/templates/templates.component";
import {MaintainMainComponent} from "./maintain/maintain-main/maintain-main.component";
import {UploadMainComponent} from "./upload/upload-main/upload-main.component";
import {MaintainComponent} from "./runtime/maintain/maintain.component";
import {MaintainListComponent} from "./maintain/maintain-list/maintain-list.component";


export const ModulesRoutingModule = [
  {
    path: 'admin',
    component: MainComponent,
    canActivate: [UserloginGuard],
    children: [
      { path: '', redirectTo: 'monitor', pathMatch: 'full' },
      {
        path: 'monitor',
        component: MonitorMainComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            component: DashboardComponent
          },
          {
            path: 'list',
            component: ListComponent
          },
          {
            path: 'map',
            component: MapComponent,
            children: [
              { path: '', redirectTo: 'general', pathMatch: 'full' },
              {
                path: 'general',
                component: MapGeneralComponent
              },
              {
                path: 'batch',
                component: MapBatchComponent
              }
            ]
          },
          {
            path: 'clusters',
            component: ClusterDashboardComponent
          },
          {
            path: 'cluster/:uid',
            component: CluEquiplistComponent
          }
        ]
      },
      {
        path: 'equipments',
        component: BoilerMainComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            component: BoilersComponent
          },
          {
            path: 'equipment-info/:uid',
            component: BoilerInfoComponent
          },
          {
            path: 'templates',
            component: BoilerTemplatesComponent
          }
        ]
      },
      {
        path: 'runtime/:uid/:name',
        component: RuntimeMainComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            component: RuntimeDashboardComponent
          },
          {
            path: 'operate',
            component: OperateComponent
          },
          {
            path: 'history',
            component: RuntimeHistoryComponent
          },
          {
            path: 'alarm',
            component: RuntimeAlarmComponent,
            children: [
              { path: '', redirectTo: 'current', pathMatch: 'full' },
              {
                path: 'current',
                component: CurrentComponent,
              },
              {
                path: 'history',
                component: HistoryComponent,
              }
            ]
          },
          {
            path: 'maintain',
            component: MaintainListComponent

          }
        ]
      },
      {
        path: 'organization',
        component: OrgMainComponent
      },
      {
        path: 'profile',
        component: ProfileMainComponent,
        children: [
          { path: '', redirectTo: 'portrait', pathMatch: 'full' },
          {
            path: 'portrait',
            component: PortraitComponent
          },
          {
            path: 'info',
            component: InfoComponent
          },
          {
            path: 'password',
            component: PasswordComponent
          }
        ]
      },
      {
        path: 'user-account',
        component: UserMainComponent
      },
      {
        path: 'terminal',
        component: TerminalMainComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            component: TerminalListComponent
          },
          {
            path: 'config/:code',
            component: TerConfigComponent
          },
          {
            path: 'messages/:code',
            component: MessagesComponent
          }
        ]
      },
      {
        path: 'cluster',
        component: ClusterMainComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            component: ClusterListComponent
          },
          {
            path: 'detail/:uid/:name',
            component: ClusterDetailComponent
          }
        ]
      },
      {
        path: 'template',
        component: TemplateMainComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            component: TemplateListComponent
          },
          {
            path: 'edit/:uid/:name',
            component: EditTempComponent
          }
        ]
      },
      {
        path: 'alarm',
        component: AlarmMainComponent,
        children: [
          { path: '', redirectTo: 'current', pathMatch: 'full' },
          {
            path: 'current',
            component: CurrentComponent
          },
          {
            path: 'history',
            component: HistoryComponent
          }
        ]
      },
      {
        path: 'maintain',
        component: MaintainMainComponent
      },
      {
        path: 'upload',
        component: UploadMainComponent
      }
    ]
  }
];

/*@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }*/
