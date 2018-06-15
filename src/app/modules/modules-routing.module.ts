import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from '../main/main.component';

import { MonitorMainComponent } from './monitor/monitor-main/monitor-main.component';
import {DashboardComponent} from './monitor/dashboard/dashboard.component';
import {ListComponent} from './monitor/list/list.component';
import {BoilerMainComponent} from './boilers/boiler-main/boiler-main.component';
import {BoilersComponent} from './boilers/boilers/boilers.component';
import {BoilerInfoComponent} from './boilers/boiler-info/boiler-info.component';
import {RuntimeMainComponent} from "./runtime/runtime-main/runtime-main.component";


export const ModulesRoutingModule = [
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
          },
          {
            path: 'list',
            component: ListComponent
          }
        ]
      },
      {
        path: 'boilers',
        component: BoilerMainComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            component: BoilersComponent
          },
          {
            path: 'boiler-info',
            component: BoilerInfoComponent
          }
        ]
      },
      {
        path: 'runtime',
        component: RuntimeMainComponent
      }
    ]
  }
];

/*@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }*/
