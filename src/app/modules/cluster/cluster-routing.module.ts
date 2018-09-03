


import {ClusterMainComponent} from "./cluster-main/cluster-main.component";
import {ClusterListComponent} from "./cluster-list/cluster-list.component";
import {ClusterDetailComponent} from "./cluster-detail/cluster-detail.component";

export const ClusterRoutingModule = [
  {
    path: '',
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
  }
];
