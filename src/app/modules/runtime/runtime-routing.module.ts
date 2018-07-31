

import {RuntimeMainComponent} from "./runtime-main/runtime-main.component";
import {RuntimeDashboardComponent} from "./dashboard/dashboard.component";
import {OperateComponent} from "./operate/operate.component";
import {RuntimeHistoryComponent} from "./history/history.component";

export const RuntimeRoutingModule = [
  {
    path: '',
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
      }
    ]
  }
];
