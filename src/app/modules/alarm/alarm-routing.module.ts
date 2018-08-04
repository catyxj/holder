
import {AlarmMainComponent} from "./alarm-main/alarm-main.component";
import {CurrentComponent} from "./current/current.component";
import {HistoryComponent} from "./history/history.component";


export const AlarmRoutingModule = [
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
  }
];
