import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from '../main/main.component';
import {MonitorMainComponent} from '../modules/monitor/monitor-main/monitor-main.component';
import {DashboardComponent} from '../modules/monitor/dashboard/dashboard.component';
import {BoilersComponent} from '../modules/boilers/boilers/boilers.component';
import {BoilerMainComponent} from '../modules/boilers/boiler-main/boiler-main.component';



export const GlobalRoutingModule = [
  {
    path: 'admin',
    component: MainComponent,
    loadChildren: '../modules/modules.module#ModulesModule'
  }
];

/*@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})*/
// export class GlobalRoutingModule { }
