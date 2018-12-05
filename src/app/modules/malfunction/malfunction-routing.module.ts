
import {MalfunctionMainComponent} from './malfunction-main/malfunction-main.component';
import {MalCurrentComponent} from './mal-current/mal-current.component';
import {MalHistoryComponent} from './mal-history/mal-history.component';
import {MalDetailComponent} from "./mal-detail/mal-detail.component";


export const MalfunctionRoutingModule = [
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
  }
];
