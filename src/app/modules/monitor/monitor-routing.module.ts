
import { MonitorMainComponent } from './monitor-main/monitor-main.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ListComponent} from './list/list.component';
import {MapComponent} from './map/map.component';
import {MapGeneralComponent} from "./map-general/map-general.component";
import {MapBatchComponent} from "./map-batch/map-batch.component";
import {ClusterDashboardComponent} from "./cluster-dashboard/cluster-dashboard.component";
import {CluEquiplistComponent} from "./clu-equiplist/clu-equiplist.component";


export const MonitorRoutingModule = [
  {
    path: '',
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
  }
];

/*@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }*/
