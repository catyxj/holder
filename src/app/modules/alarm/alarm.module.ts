import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentComponent } from './current/current.component';
import { HistoryComponent } from './history/history.component';
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {AlarmRoutingModule} from "./alarm-routing.module";
import { AlarmDetailComponent } from './alarm-detail/alarm-detail.component';
import {NgxEchartsModule} from "ngx-echarts";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    NgZorroAntdModule,
    NgxEchartsModule,
    RouterModule.forChild(AlarmRoutingModule)
  ],
  declarations: [
    CurrentComponent,
    HistoryComponent,
    AlarmDetailComponent
  ],
  entryComponents: [
    AlarmDetailComponent
  ]
})
export class AlarmModule { }
