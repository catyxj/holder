

import {RuntimeMainComponent} from "./runtime-main/runtime-main.component";
import {RuntimeDashboardComponent} from "./dashboard/dashboard.component";
import {OperateComponent} from "./operate/operate.component";
import {RuntimeHistoryComponent} from "./history/history.component";
import {RuntimeAlarmComponent} from "./alarm/alarm.component";
import {MaintainListComponent} from "../maintain/maintain-list/maintain-list.component";
import {CurrentComponent} from "../alarm/current/current.component";
import {HistoryComponent} from "../alarm/history/history.component";

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
  }
];
