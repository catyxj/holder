import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ListComponent } from './list/list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MonitorRoutingModule } from './monitor-routing.module';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    MonitorRoutingModule
  ],
  declarations: [
    ListComponent,
    DashboardComponent
  ],
  exports: [
    RouterModule
  ]
})
export class MonitorModule { }
