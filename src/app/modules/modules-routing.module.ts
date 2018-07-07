import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from '../main/main.component';

import { MonitorMainComponent } from './monitor/monitor-main/monitor-main.component';
import {DashboardComponent} from './monitor/dashboard/dashboard.component';
import {ListComponent} from './monitor/list/list.component';
import {BoilerMainComponent} from './boilers/boiler-main/boiler-main.component';
import {BoilersComponent} from './boilers/boilers/boilers.component';
import {BoilerInfoComponent} from './boilers/boiler-info/boiler-info.component';
import {RuntimeMainComponent} from './runtime/runtime-main/runtime-main.component';
import {MapComponent} from './monitor/map/map.component';
import {OrgMainComponent} from './organization/org-main/org-main.component';
import {ProfileMainComponent} from './profile/profile-main/profile-main.component';
import {PortraitComponent} from './profile/portrait/portrait.component';
import {InfoComponent} from './profile/info/info.component';
import {PasswordComponent} from './profile/password/password.component';
import {UserloginGuard} from '../shared/userlogin.guard';
import {UserMainComponent} from './user-account/user-main/user-main.component';


export const ModulesRoutingModule = [
  {
    path: 'admin',
    component: MainComponent,
    canActivate: [UserloginGuard],
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
          },
          {
            path: 'map',
            component: MapComponent
          }
        ]
      },
      {
        path: 'equipments',
        component: BoilerMainComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            component: BoilersComponent
          },
          {
            path: 'equipment-info/:uid',
            component: BoilerInfoComponent
          }
        ]
      },
      {
        path: 'runtime',
        component: RuntimeMainComponent
      },
      {
        path: 'organization',
        component: OrgMainComponent
      },
      {
        path: 'profile',
        component: ProfileMainComponent,
        children: [
          { path: '', redirectTo: 'portrait', pathMatch: 'full' },
          {
            path: 'portrait',
            component: PortraitComponent
          },
          {
            path: 'info',
            component: InfoComponent
          },
          {
            path: 'password',
            component: PasswordComponent
          }
        ]
      },
      {
        path: 'user-account',
        component: UserMainComponent
      },
    ]
  }
];

/*@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }*/
