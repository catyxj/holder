import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintainListComponent } from './maintain-list/maintain-list.component';
import {MaintainMainComponent} from "./maintain-main/maintain-main.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { AddMaintainComponent } from './add-maintain/add-maintain.component';
import {NgZorroAntdModule} from "ng-zorro-antd";


const MaintainRoutingModule = [
  {
    path: 'maintain',
    component: MaintainMainComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    NgZorroAntdModule,
    RouterModule.forChild(MaintainRoutingModule)
  ],
  declarations: [
    MaintainListComponent,
    AddMaintainComponent
  ],
  entryComponents: [
    AddMaintainComponent
  ],
  exports: [
    MaintainListComponent
  ]
})
export class MaintainModule { }
