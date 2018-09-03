
import {MainComponent} from '../main/main.component';
import {UserloginGuard} from "../shared/userlogin.guard";

import {RuntimeMainComponent} from "../modules/runtime/runtime-main/runtime-main.component";
import {OrgMainComponent} from "../modules/organization/org-main/org-main.component";
import {UserMainComponent} from "../modules/user-account/user-main/user-main.component";
import {AlarmMainComponent} from "../modules/alarm/alarm-main/alarm-main.component";
import {CurrentComponent} from "../modules/alarm/current/current.component";
import {HistoryComponent} from "../modules/alarm/history/history.component";
import {MaintainMainComponent} from "../modules/maintain/maintain-main/maintain-main.component";
import {UploadMainComponent} from "../modules/upload/upload-main/upload-main.component";
import {RuntimeDashboardComponent} from "../modules/runtime/dashboard/dashboard.component";
import {OperateComponent} from "../modules/runtime/operate/operate.component";
import {RuntimeHistoryComponent} from "../modules/runtime/history/history.component";
import {RuntimeAlarmComponent} from "../modules/runtime/alarm/alarm.component";
import {MaintainListComponent} from "../modules/maintain/maintain-list/maintain-list.component";



export const GlobalRoutingModule = [
  {
    path: 'admin',
    component: MainComponent,
    canActivate: [UserloginGuard],
    children: [
      { path: '', redirectTo: 'monitor', pathMatch: 'full' },
      {
        path: 'monitor',
        // component: MonitorMainComponent,
        loadChildren: '../modules/monitor/monitor.module#MonitorModule'
        /*children: [
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
        ]*/
      },
      {
        path: 'equipments',
        // component: BoilerMainComponent,
        loadChildren: '../modules/boilers/boilers.module#BoilersModule'
        /*children: [
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
        ]*/
      },
      {
        path: 'runtime/:uid/:name',
        component: RuntimeMainComponent,
        // loadChildren: '../modules/runtime/runtime.module#RuntimeModule'
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
        // component: ProfileMainComponent,
        loadChildren: '../modules/profile/profile.module#ProfileModule'
        /*children: [
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
        ]*/
      },
      {
        path: 'user-account',
        component: UserMainComponent
      },
      {
        path: 'terminal',
        // component: TerminalMainComponent,
        loadChildren: '../modules/terminal/terminal.module#TerminalModule'
        // children: [
        //   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        //   {
        //     path: 'dashboard',
        //     component: TerminalListComponent
        //   },
        //   {
        //     path: 'config/:code',
        //     component: TerConfigComponent
        //   },
        //   {
        //     path: 'messages/:code',
        //     component: MessagesComponent
        //   },
        //   {
        //     path: 'plc/:code',
        //     component: PlcAlarmComponent
        //   }
        // ]
      },
      {
        path: 'cluster',
        // component: ClusterMainComponent,
        loadChildren: '../modules/cluster/cluster.module#ClusterModule'
        /*children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            component: ClusterListComponent
          },
          {
            path: 'detail/:uid/:name',
            component: ClusterDetailComponent
          }
        ]*/
      },
      {
        path: 'template',
        // component: TemplateMainComponent,
        loadChildren: '../modules/template/template.module#TemplateModule'
        /*children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            component: TemplateListComponent
          },
          {
            path: 'edit/:uid/:name',
            component: EditTempComponent
          }
        ]*/
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
      /*{
        path: 'maintain',
        component: MaintainMainComponent
      },*/
      {
        path: 'upload',
        component: UploadMainComponent
      }
    ]
    // loadChildren: '../modules/modules.module#ModulesModule'
  }
];

/*@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})*/
// export class GlobalRoutingModule { }
