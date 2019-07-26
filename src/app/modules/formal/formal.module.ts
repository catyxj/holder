
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LayoutModule} from "@angular/cdk/layout";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormalRoutingModule} from "./formal-routing.module";
import {MainFormalComponent} from "./main-formal/main-formal.component";
import {FormsModule} from "@angular/forms";
import { AcccountMainComponent } from './account/acccount-main/acccount-main.component';
import { AccountInfoFormalComponent } from './account/account-info-formal/account-info-formal.component';
import { UsersMainComponent } from './users/users-main/users-main.component';
import { UserListFormalComponent } from './users/user-list-formal/user-list-formal.component';
import { UserDetailFormalComponent } from './users/user-detail-formal/user-detail-formal.component';
import { ServiceMainFormalComponent } from './service/service-main-formal/service-main-formal.component';
import { ServiceListFormalComponent } from './service/service-list-formal/service-list-formal.component';
import { ServiceInfoFormalComponent } from './service/service-info-formal/service-info-formal.component';
import { ServiceDetailFormalComponent } from './service/service-detail-formal/service-detail-formal.component';
import { MRecordMainFormalComponent } from './maintain/m-record/m-record-main-formal/m-record-main-formal.component';
import { MRecordListFormalComponent } from './maintain/m-record/m-record-list-formal/m-record-list-formal.component';
import { MAccountMainFormalComponent } from './maintain/m-account/m-account-main-formal/m-account-main-formal.component';
import { MAccountListFormalComponent } from './maintain/m-account/m-account-list-formal/m-account-list-formal.component';
import { MTemplateMainFormalComponent } from './maintain/m-template/m-template-main-formal/m-template-main-formal.component';
import { MTemplateListFormalComponent } from './maintain/m-template/m-template-list-formal/m-template-list-formal.component';
import { AccountEditFormalComponent } from './account/modals/account-edit-formal/account-edit-formal.component';
import { AccountOperateFormalComponent } from './account/account-operate-formal/account-operate-formal.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    RouterModule.forChild( FormalRoutingModule ),
    NgbModule,
    NgZorroAntdModule,
  ],
  declarations: [
    MainFormalComponent,
    UsersMainComponent,
    UserListFormalComponent,
    UserDetailFormalComponent,
    AcccountMainComponent,
    AccountInfoFormalComponent,
    AccountEditFormalComponent,
    AccountOperateFormalComponent,
    ServiceMainFormalComponent,
    ServiceListFormalComponent,
    ServiceInfoFormalComponent,
    ServiceDetailFormalComponent,
    MRecordMainFormalComponent,
    MRecordListFormalComponent,
    MAccountMainFormalComponent,
    MAccountListFormalComponent,
    MTemplateMainFormalComponent,
    MTemplateListFormalComponent,
  ],
  exports: [
    UserDetailFormalComponent,
    AccountOperateFormalComponent,
    ServiceInfoFormalComponent,
    ServiceDetailFormalComponent,
  ],
  entryComponents: [
    AccountEditFormalComponent,
  ]
})
export class FormalModule { }
