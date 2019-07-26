
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutModule} from '@angular/cdk/layout';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {ServiceRoutingModule} from './service-routing.module';
import { MaintainProdMainSerComponent } from './maintain-prod/maintain-prod-main-ser/maintain-prod-main-ser.component';
import { MainSerComponent } from './main-ser/main-ser.component';
import { MaintainProdAddSerComponent } from './maintain-prod/modals/maintain-prod-add-ser/maintain-prod-add-ser.component';
import { MaintainRecordMainSerComponent } from './maintain-record/maintain-record-main-ser/maintain-record-main-ser.component';
import { MaintainRecordEditSerComponent } from './maintain-record/modals/maintain-record-edit-ser/maintain-record-edit-ser.component';
import { AcMainSerComponent } from './account/ac-main-ser/ac-main-ser.component';
import { AcInfoSerComponent } from './account/ac-info-ser/ac-info-ser.component';
import { AcConfigSerComponent } from './account/modals/ac-config-ser/ac-config-ser.component';
import { MaintainProdListSerComponent } from './maintain-prod/maintain-prod-list-ser/maintain-prod-list-ser.component';
import { MaintainRecordListSerComponent } from './maintain-record/maintain-record-list-ser/maintain-record-list-ser.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    RouterModule.forChild( ServiceRoutingModule ),
    NgbModule,
    NgZorroAntdModule,
  ],
  declarations: [
    MaintainProdMainSerComponent,
    MainSerComponent,
    MaintainProdAddSerComponent,
    MaintainRecordMainSerComponent,
    MaintainRecordEditSerComponent,
    AcMainSerComponent,
    AcInfoSerComponent,
    AcConfigSerComponent,
    MaintainProdListSerComponent,
    MaintainRecordListSerComponent
  ],
  exports: [

  ],
  entryComponents: [
    MaintainProdAddSerComponent,
    MaintainRecordEditSerComponent,
    AcConfigSerComponent
  ]
})
export class ServiceModule { }
