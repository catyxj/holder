import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitorMainComponent } from './monitor-main/monitor-main.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ListComponent} from './list/list.component';
import {MapComponent} from './map/map.component';
import {MapGeneralComponent} from "./map-general/map-general.component";
import {MapBatchComponent} from "./map-batch/map-batch.component";


export const MonitorRoutingModule = [
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
      }
    ]
  }
];

/*@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }*/
