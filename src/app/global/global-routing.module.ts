import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from '../main/main.component';
import {MonitorMainComponent} from '../modules/monitor/monitor-main/monitor-main.component';
import {DashboardComponent} from '../modules/monitor/dashboard/dashboard.component';
import {BoilersComponent} from '../modules/boilers/boilers/boilers.component';



export const GlobalRoutingModule = [
  {
    path: 'admin',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'monitor', pathMatch: 'full' },
      {
        path: 'monitor',
        component: MonitorMainComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            component: DashboardComponent
          }
        ]
      },
      {
        path: 'boilers',
        component: BoilersComponent
      }
    ]
  }
];

/*@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})*/
// export class GlobalRoutingModule { }
