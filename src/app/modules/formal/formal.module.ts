
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
import { AccountOrderDetailFormalComponent } from './account/account-order-detail-formal/account-order-detail-formal.component';
import { ServiceAddFormalComponent } from './service/modals/service-add-formal/service-add-formal.component';
import { MRecordInfoFormalComponent } from './maintain/m-record/m-record-info-formal/m-record-info-formal.component';
import { MAccountInfoFormalComponent } from './maintain/m-account/m-account-info-formal/m-account-info-formal.component';
import { AccountPasswordFormalComponent } from './account/modals/account-password-formal/account-password-formal.component';
import { BlueMainFormalComponent } from './bluetooth/blue-main-formal/blue-main-formal.component';
import { BlueListFormalComponent } from './bluetooth/blue-list-formal/blue-list-formal.component';
import { BlueInfoFormalComponent } from './bluetooth/blue-info-formal/blue-info-formal.component';
import { BlueOperateFormalComponent } from './bluetooth/blue-operate-formal/blue-operate-formal.component';
import { BlueEditFormalComponent } from './bluetooth/modals/blue-edit-formal/blue-edit-formal.component';
import { VideoMainFormalComponent } from './video/video-main-formal/video-main-formal.component';
import { VideoListFormalComponent } from './video/video-list-formal/video-list-formal.component';
import { VideoInfoFormalComponent } from './video/video-info-formal/video-info-formal.component';
import { VideoOperateFormalComponent } from './video/video-operate-formal/video-operate-formal.component';
import { VideoEditFormalComponent } from './video/modals/video-edit-formal/video-edit-formal.component';
import { TerminalMainFormalComponent } from './terminal/terminal-main-formal/terminal-main-formal.component';
import { TerminalListFormalComponent } from './terminal/terminal-list-formal/terminal-list-formal.component';
import { TerminalInfoFormalComponent } from './terminal/terminal-info-formal/terminal-info-formal.component';
import { TerminalOperateFormalComponent } from './terminal/terminal-operate-formal/terminal-operate-formal.component';
import { TerminalMessageFormalComponent } from './terminal/terminal-message-formal/terminal-message-formal.component';
import { TerminalConfigFormalComponent } from './terminal/terminal-config-formal/terminal-config-formal.component';
import { TerminalAddFormalComponent } from './terminal/modals/terminal-add-formal/terminal-add-formal.component';
import { TerminalBasicEditFormalComponent } from './terminal/modals/terminal-basic-edit-formal/terminal-basic-edit-formal.component';
import { TerminalCommunicationEditFormalComponent } from './terminal/modals/terminal-communication-edit-formal/terminal-communication-edit-formal.component';
import { TerminalChannelConfigFormalComponent } from './terminal/terminal-channel-config-formal/terminal-channel-config-formal.component';
import { TerminalCustomizeFormalComponent } from './terminal/terminal-customize-formal/terminal-customize-formal.component';
import { BlueAddFormalComponent } from './bluetooth/modals/blue-add-formal/blue-add-formal.component';
import { VideoAddFormalComponent } from './video/modals/video-add-formal/video-add-formal.component';
import { TerminalAddImgFormalComponent } from './terminal/modals/terminal-add-img-formal/terminal-add-img-formal.component';
import { TemplateMainFormalComponent } from './template/template-main-formal/template-main-formal.component';
import { TemplateListFormalComponent } from './template/template-list-formal/template-list-formal.component';
import {MatGridListModule, MatMenuModule} from "@angular/material";
import { TemplateChannelFormalComponent } from './template/template-channel-formal/template-channel-formal.component';
import { TemplateConfigFormalComponent } from './template/template-config-formal/template-config-formal.component';
import { TemplateCustomizeFormalComponent } from './template/template-customize-formal/template-customize-formal.component';
import { TemplateAddMainComponent } from './template/add/template-add-main/template-add-main.component';
import { TemplateAddEptComponent } from './template/add/template-add-ept/template-add-ept.component';
import { TemplateAddCmtComponent } from './template/add/template-add-cmt/template-add-cmt.component';
import { TemplateAddChannelComponent } from './template/add/template-add-channel/template-add-channel.component';
import { TemplateAddCustomizeComponent } from './template/add/template-add-customize/template-add-customize.component';
import { TemplateAddFinishComponent } from './template/add/template-add-finish/template-add-finish.component';
import { AlarmRuleComponent } from './terminal/modals/alarm-rule/alarm-rule.component';
import { RangeConfigComponent } from './terminal/modals/range-config/range-config.component';
import { TerminalCalculateConfigComponent } from './terminal/terminal-calculate-config/terminal-calculate-config.component';
import { TerCal1Component } from './terminal/calculate/ter-cal1/ter-cal1.component';
import { TerCal2Component } from './terminal/calculate/ter-cal2/ter-cal2.component';
import { TerCal3Component } from './terminal/calculate/ter-cal3/ter-cal3.component';
import { TemplateBatchDeleteFComponent } from './template/template-batch-delete-f/template-batch-delete-f.component';
import { TemplateBatchAllocateComponent } from './template/template-batch-allocate/template-batch-allocate.component';
import { TerminalDeleteImgComponent } from './terminal/modals/terminal-delete-img/terminal-delete-img.component';
import { TemplateAddCalculateComponent } from './template/add/template-add-calculate/template-add-calculate.component';
import { TemplateCmtEditFComponent } from './template/modals/template-cmt-edit-f/template-cmt-edit-f.component';
import { TemplateBasicEditFComponent } from './template/modals/template-basic-edit-f/template-basic-edit-f.component';
import { TempCal1Component } from './template/calculate/temp-cal1/temp-cal1.component';
import { TempCal2Component } from './template/calculate/temp-cal2/temp-cal2.component';
import { TempCal3Component } from './template/calculate/temp-cal3/temp-cal3.component';
import { TempCalMainComponent } from './template/calculate/temp-cal-main/temp-cal-main.component';
import { MAccountAddFComponent } from './maintain/m-account/modals/m-account-add-f/m-account-add-f.component';
import { MAccountBasicFComponent } from './maintain/m-account/modals/m-account-basic-f/m-account-basic-f.component';
import { MAccountProductFComponent } from './maintain/m-account/m-account-product-f/m-account-product-f.component';
import { MTemplateAddFComponent } from './maintain/m-template/modals/m-template-add-f/m-template-add-f.component';
import { MTempBatchDeleteFComponent } from './maintain/m-template/m-temp-batch-delete-f/m-temp-batch-delete-f.component';
import { MTempBatchAllocateFComponent } from './maintain/m-template/m-temp-batch-allocate-f/m-temp-batch-allocate-f.component';
import { MTemplateEditFComponent } from './maintain/m-template/modals/m-template-edit-f/m-template-edit-f.component';
import { MAcBatchAddComponent } from './maintain/m-account/product/m-ac-batch-add/m-ac-batch-add.component';
import { MAcBatchDeleteComponent } from './maintain/m-account/product/m-ac-batch-delete/m-ac-batch-delete.component';
import { TempAddCalc1Component } from './template/add/modals/temp-add-calc1/temp-add-calc1.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    RouterModule.forChild( FormalRoutingModule ),
    NgbModule,
    NgZorroAntdModule,
    MatMenuModule,
    MatGridListModule,
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
    AccountOrderDetailFormalComponent,
    ServiceMainFormalComponent,
    ServiceListFormalComponent,
    ServiceInfoFormalComponent,
    ServiceDetailFormalComponent,
    ServiceAddFormalComponent,
    MRecordMainFormalComponent,
    MRecordListFormalComponent,
    MRecordInfoFormalComponent,
    MAccountMainFormalComponent,
    MAccountListFormalComponent,
    MAccountInfoFormalComponent,
    MTemplateMainFormalComponent,
    MTemplateListFormalComponent,
    AccountPasswordFormalComponent,
    BlueMainFormalComponent,
    BlueListFormalComponent,
    BlueInfoFormalComponent,
    BlueOperateFormalComponent,
    BlueAddFormalComponent,
    BlueEditFormalComponent,
    VideoMainFormalComponent,
    VideoListFormalComponent,
    VideoInfoFormalComponent,
    VideoOperateFormalComponent,
    VideoAddFormalComponent,
    VideoEditFormalComponent,
    TerminalMainFormalComponent,
    TerminalListFormalComponent,
    TerminalInfoFormalComponent, // 终端信息
    TerminalOperateFormalComponent, // 终端配置记录
    TerminalMessageFormalComponent, // 终端调试报文
    TerminalConfigFormalComponent, // 终端配置
    TerminalChannelConfigFormalComponent, // 终端通道配置
    TerminalCustomizeFormalComponent, // 组态图
    TerminalAddFormalComponent, // 新增终端
    TerminalBasicEditFormalComponent, // 终端基础信息设置
    TerminalCommunicationEditFormalComponent, // 终端通信参数设置
    TerminalAddImgFormalComponent,
    TemplateMainFormalComponent,
    TemplateListFormalComponent,
    TemplateChannelFormalComponent,
    TemplateConfigFormalComponent,
    TemplateCustomizeFormalComponent,
    TemplateAddMainComponent,
    TemplateAddEptComponent,
    TemplateAddCmtComponent,
    TemplateAddChannelComponent,
    TemplateAddCustomizeComponent,
    TemplateAddFinishComponent,
    AlarmRuleComponent,
    RangeConfigComponent,
    TerminalCalculateConfigComponent,
    TerCal1Component,
    TerCal2Component,
    TerCal3Component,
    TemplateBatchDeleteFComponent,
    TemplateBatchAllocateComponent,
    TerminalDeleteImgComponent,
    TemplateAddCalculateComponent,
    TemplateCmtEditFComponent,
    TemplateBasicEditFComponent,
    TempCal1Component,
    TempCal2Component,
    TempCal3Component,
    TempCalMainComponent,
    MAccountAddFComponent,
    MAccountBasicFComponent,
    MAccountProductFComponent,
    MTemplateAddFComponent,
    MTempBatchDeleteFComponent,
    MTempBatchAllocateFComponent,
    MTemplateEditFComponent,
    MAcBatchAddComponent,
    MAcBatchDeleteComponent,
    TempAddCalc1Component,
  ],
  exports: [],
  entryComponents: [
    AccountEditFormalComponent,
    ServiceAddFormalComponent,
    AccountPasswordFormalComponent,
    BlueAddFormalComponent,
    BlueEditFormalComponent,
    VideoAddFormalComponent,
    VideoEditFormalComponent,
    TerminalAddFormalComponent,
    TerminalBasicEditFormalComponent,
    TerminalCommunicationEditFormalComponent,
    TerminalAddImgFormalComponent,
    AlarmRuleComponent,
    RangeConfigComponent,
    TerminalDeleteImgComponent,
    TemplateCmtEditFComponent,
    TemplateBasicEditFComponent,
    MAccountAddFComponent,
    MAccountBasicFComponent,
    MTemplateAddFComponent,
    MTemplateEditFComponent,
    TempAddCalc1Component
  ]
})
export class FormalModule { }
