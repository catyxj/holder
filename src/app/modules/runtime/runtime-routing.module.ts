

import {RuntimeMainComponent} from './runtime-main/runtime-main.component';
import {RuntimeDashboardComponent} from './dashboard/dashboard.component';
import {OperateComponent} from './operate/operate.component';
import {RuntimeHistoryComponent} from './history/history.component';
import {RuntimeAlarmComponent} from './alarm/alarm.component';
import {AlarmCurrentComponent} from './alarm-current/alarm-current.component';
import {AlarmHistoryComponent} from './alarm-history/alarm-history.component';
import {MaintainComponent} from './maintain/maintain.component';
import {MaintainDashboardComponent} from './maintain-dashboard/maintain-dashboard.component';
import {MaintainViewComponent} from './maintain-view/maintain-view.component';
import {MaintainAddComponent} from './maintain-add/maintain-add.component';

export const RuntimeRoutingModule = [
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
      }
    ]
  }
];
