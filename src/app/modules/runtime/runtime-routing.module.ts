

import {RuntimeMainComponent} from "./runtime-main/runtime-main.component";
import {RuntimeDashboardComponent} from "./dashboard/dashboard.component";

export const RuntimeRoutingModule = [
  {
    path: '',
    component: RuntimeMainComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: RuntimeDashboardComponent
      }
    ]
  }
];
