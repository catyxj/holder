

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
import {ClusterListComponent} from './cluster/cluster-list/cluster-list.component';
import {ClusterDetailComponent} from './cluster/cluster-detail/cluster-detail.component';
import {TemplateMainComponent} from './template/template-main/template-main.component';
import {TemplateListComponent} from './template/template-list/template-list.component';
import {EditTempComponent} from './template/edit-temp/edit-temp.component';
import {AlarmMainComponent} from './alarm/alarm-main/alarm-main.component';
import {CurrentComponent} from './alarm/current/current.component';
import {HistoryComponent} from './alarm/history/history.component';
import {MapGeneralComponent} from './monitor/map-general/map-general.component';
import {MapBatchComponent} from './monitor/map-batch/map-batch.component';
import {RuntimeDashboardComponent} from './runtime/dashboard/dashboard.component';
import {CluEquiplistComponent} from './monitor/clu-equiplist/clu-equiplist.component';
import {ClusterDashboardComponent} from './monitor/cluster-dashboard/cluster-dashboard.component';
import {OperateComponent} from './runtime/operate/operate.component';
import {RuntimeHistoryComponent} from './runtime/history/history.component';
import {AlarmCurrentComponent} from './runtime/alarm-current/alarm-current.component';
import {RuntimeAlarmComponent} from './runtime/alarm/alarm.component';
import {BoilerTemplatesComponent} from './boilers/templates/templates.component';
import {MaintainMainComponent} from './maintain/maintain-main/maintain-main.component';
import {UploadMainComponent} from './upload/upload-main/upload-main.component';
import {PlcAlarmComponent} from './terminal/plc-alarm/plc-alarm.component';
import {AlarmHistoryComponent} from './runtime/alarm-history/alarm-history.component';
import {ViewConfigComponent} from './overview/view-config/view-config.component';
import {OverviewMainComponent} from './overview/overview-main/overview-main.component';
import {AddEquipComponent} from './overview/add-equip/add-equip.component';
import {AddTermComponent} from './overview/add-term/add-term.component';
import {AddTemplateComponent} from './overview/add-template/add-template.component';
import {MalfunctionMainComponent} from './malfunction/malfunction-main/malfunction-main.component';
import {MalCurrentComponent} from './malfunction/mal-current/mal-current.component';
import {MalHistoryComponent} from './malfunction/mal-history/mal-history.component';
import {MaintainComponent} from './runtime/maintain/maintain.component';
import {MaintainDashboardComponent} from './runtime/maintain-dashboard/maintain-dashboard.component';
import {MaintainViewComponent} from './runtime/maintain-view/maintain-view.component';
import {MaintainAddComponent} from './runtime/maintain-add/maintain-add.component';
import {MalDetailComponent} from './malfunction/mal-detail/mal-detail.component';
import {ServiceMainComponent} from './service/service-main/service-main.component';
import {ServiceListComponent} from './service/service-list/service-list.component';
import {ServiceDashboardComponent} from './service/service-dashboard/service-dashboard.component';
import {SerDashboard2Component} from './service/ser-dashboard2/ser-dashboard2.component';
import {SerViewComponent} from './service/ser-view/ser-view.component';
import {SerAddComponent} from './service/ser-add/ser-add.component';
import {LifeMainComponent} from './runtime/life/life-main/life-main.component';
import {LifeListComponent} from './runtime/life/life-list/life-list.component';



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
            path: 'cluster/:uid/:name',
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
                component: AlarmCurrentComponent,
              },
              {
                path: 'history',
                component: AlarmHistoryComponent,
              }
            ]
          },
          {
            path: 'maintain',
            component: MaintainComponent,
            children: [
              { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
              {
                path: 'dashboard',
                component: MaintainDashboardComponent,
              },
              {
                path: 'view/:uid/:date/:create',
                component: MaintainViewComponent,
              },
              {
                path: 'add',
                component: MaintainAddComponent,
              }
            ]
          },
          {
            path: 'life',
            component: LifeMainComponent,
            children: [
              { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
              {
                path: 'dashboard',
                component: LifeListComponent,
              }
            ]
          }
        ]
      },
      {
        path: 'organization',
        component: OrgMainComponent,
        canActivate: [UserloginGuard]
      },
      {
        path: 'profile',
        component: ProfileMainComponent,
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
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
        component: UserMainComponent,
        canActivate: [UserloginGuard]
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
          },
          {
            path: 'plc/:code',
            component: PlcAlarmComponent
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
        component: MaintainMainComponent,
      },
      {
        path: 'upload',
        component: UploadMainComponent,
      },
      {
        path: 'overview',
        component: OverviewMainComponent,
        children: [
          { path: '', redirectTo: 'equip', pathMatch: 'full' },
          {
            path: 'equip',
            component: AddEquipComponent
          },
          {
            path: 'term/:uid',
            component: AddTermComponent
          },
          {
            path: 'template/:uid',
            component: AddTemplateComponent
          },
          {
            path: 'config/:uid',
            component: ViewConfigComponent
          }
        ]
      },
      {
        path: 'malfunction',
        component: MalfunctionMainComponent,
        children: [
          { path: '', redirectTo: 'current', pathMatch: 'full' },
          {
            path: 'current',
            component: MalCurrentComponent
          },
          {
            path: 'history',
            component: MalHistoryComponent
          },
          {
            path: 'detail/:uid/:date/:create',
            component: MalDetailComponent
          }
        ]
      },
      {
        path: 'service',
        component: ServiceMainComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: ServiceListComponent
          },
          {
            path: 'dashboard',
            component: ServiceDashboardComponent,
            children: [
              { path: '', redirectTo: 'question/1/A类问题', pathMatch: 'full' },
              {
                path: 'question/:id/:name',
                component: SerDashboard2Component
              }
            ]
          },
          {
            path: 'view/:uid',
            component: SerViewComponent
          },
          {
            path: 'add',
            component: SerAddComponent
          },

        ]
      }
    ]
  }
];

/*@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }*/
