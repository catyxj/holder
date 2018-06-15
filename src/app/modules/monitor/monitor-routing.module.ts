import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitorMainComponent } from './monitor-main/monitor-main.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ListComponent} from './list/list.component';


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
      }
    ]
  }
];

/*@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }*/
