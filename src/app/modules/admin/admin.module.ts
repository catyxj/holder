
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LayoutModule} from "@angular/cdk/layout";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {AdminRoutingModule} from "./admin-routing.module";
import {MainAdComponent} from "./main-ad/main-ad.component";
import { TerMainAdComponent } from './terminal/ter-main-ad/ter-main-ad.component';
import { VMainAdComponent } from './video/v-main-ad/v-main-ad.component';
import { BlueMainAdComponent } from './bluetooth/blue-main-ad/blue-main-ad.component';
import { AcMainAdComponent } from './account/ac-main-ad/ac-main-ad.component';
import { AcListAdComponent } from './account/ac-list-ad/ac-list-ad.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AcInfoAdComponent } from './account/ac-info-ad/ac-info-ad.component';
import { AcEcofAdComponent } from './account/modals/ac-ecof-ad/ac-ecof-ad.component';
import { AcOperateAdComponent } from './account/ac-operate-ad/ac-operate-ad.component';
import { AcDisableAdComponent } from './account/modals/ac-disable-ad/ac-disable-ad.component';
import { TerListAdComponent } from './terminal/ter-list-ad/ter-list-ad.component';
import { SerMainAdComponent } from './service/ser-main-ad/ser-main-ad.component';
import { SerListAdComponent } from './service/ser-list-ad/ser-list-ad.component';
import { SerInfoAdComponent } from './service/ser-info-ad/ser-info-ad.component';
import { TerAddAdComponent } from './terminal/modals/ter-add-ad/ter-add-ad.component';
import { TerBatchAddAdComponent } from './terminal/modals/ter-batch-add-ad/ter-batch-add-ad.component';
import { TerInfoAdComponent } from './terminal/ter-info-ad/ter-info-ad.component';
import { TerBasicConfigAdComponent } from './terminal/modals/ter-basic-config-ad/ter-basic-config-ad.component';
import { TerScrapAdComponent } from './terminal/modals/ter-scrap-ad/ter-scrap-ad.component';
import { TerOperateAdComponent } from './terminal/ter-operate-ad/ter-operate-ad.component';
import { VListAdComponent } from './video/v-list-ad/v-list-ad.component';
import { VInfoAdComponent } from './video/v-info-ad/v-info-ad.component';
import { VAddAdComponent } from './video/modals/v-add-ad/v-add-ad.component';
import { VBasicConfigAdComponent } from './video/modals/v-basic-config-ad/v-basic-config-ad.component';
import { VScrapAdComponent } from './video/modals/v-scrap-ad/v-scrap-ad.component';
import { VOperateAdComponent } from './video/v-operate-ad/v-operate-ad.component';
import { BlueListAdComponent } from './bluetooth/blue-list-ad/blue-list-ad.component';
import { BlueInfoAdComponent } from './bluetooth/blue-info-ad/blue-info-ad.component';
import { BlueOperateAdComponent } from './bluetooth/blue-operate-ad/blue-operate-ad.component';
import { BlueAddAdComponent } from './bluetooth/modals/blue-add-ad/blue-add-ad.component';
import { BlueScrapAdComponent } from './bluetooth/modals/blue-scrap-ad/blue-scrap-ad.component';
import { BlueBasicConfigAdComponent } from './bluetooth/modals/blue-basic-config-ad/blue-basic-config-ad.component';
import { FlowMainAdComponent } from './flow/flow-main-ad/flow-main-ad.component';
import { OrderMainAdComponent } from './order/order-main-ad/order-main-ad.component';
import { FlowListAdComponent } from './flow/flow-list-ad/flow-list-ad.component';
import { OrderListAdComponent } from './order/order-list-ad/order-list-ad.component';
import { TerFlowAdComponent } from './terminal/modals/ter-flow-ad/ter-flow-ad.component';
import { FlowInfoAdComponent } from './flow/flow-info-ad/flow-info-ad.component';
import { FlowOperateAdComponent } from './flow/flow-operate-ad/flow-operate-ad.component';
import { FlowChargeInlineAdComponent } from './flow/modals/flow-charge-inline-ad/flow-charge-inline-ad.component';
import { FlowBatchRechargeAdComponent } from './flow/modals/flow-batch-recharge-ad/flow-batch-recharge-ad.component';
import { OrderInfoAdComponent } from './order/order-info-ad/order-info-ad.component';
import { OrderStatusSettingAdComponent } from './order/modals/order-status-setting-ad/order-status-setting-ad.component';
import { VideoLiveAdComponent } from './video/video-live-ad/video-live-ad.component';
import { OvMainAdComponent } from './overview/ov-main-ad/ov-main-ad.component';
import { OvDashboardAdComponent } from './overview/ov-dashboard-ad/ov-dashboard-ad.component';
import { AcBatchDisabledAdComponent } from './account/modals/ac-batch-disabled-ad/ac-batch-disabled-ad.component';
import { AcBatchActiveAdComponent } from './account/modals/ac-batch-active-ad/ac-batch-active-ad.component';
import { TerMessageAdComponent } from './terminal/ter-message-ad/ter-message-ad.component';



@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild( AdminRoutingModule ),
    NgbModule,
    NgZorroAntdModule
  ],
  declarations: [
    MainAdComponent,
    TerMainAdComponent,
    VMainAdComponent,
    BlueMainAdComponent,
    AcMainAdComponent,
    FlowMainAdComponent,
    OrderMainAdComponent,
    AcListAdComponent,
    AcInfoAdComponent,
    AcEcofAdComponent,
    AcOperateAdComponent,
    AcDisableAdComponent,
    TerListAdComponent,
    SerMainAdComponent,
    SerListAdComponent,
    SerInfoAdComponent,
    TerAddAdComponent,
    TerBatchAddAdComponent,
    TerInfoAdComponent,
    TerBasicConfigAdComponent,
    TerScrapAdComponent,
    TerOperateAdComponent,
    TerFlowAdComponent,
    VListAdComponent,
    VInfoAdComponent,
    VAddAdComponent,
    VBasicConfigAdComponent,
    VScrapAdComponent,
    VOperateAdComponent,
    BlueListAdComponent,
    BlueInfoAdComponent,
    BlueOperateAdComponent,
    BlueAddAdComponent,
    BlueBasicConfigAdComponent,
    BlueScrapAdComponent,
    FlowListAdComponent,
    OrderListAdComponent,
    FlowInfoAdComponent,
    FlowOperateAdComponent,
    FlowChargeInlineAdComponent,
    FlowBatchRechargeAdComponent,
    OrderInfoAdComponent,
    OrderStatusSettingAdComponent,
    VideoLiveAdComponent,
    OvMainAdComponent,
    OvDashboardAdComponent,
    AcBatchDisabledAdComponent,
    AcBatchActiveAdComponent,
    TerMessageAdComponent,
  ],
  exports: [
    AcInfoAdComponent,
    AcOperateAdComponent,
    TerInfoAdComponent,
    TerOperateAdComponent,
    VInfoAdComponent,
    VOperateAdComponent,
    BlueInfoAdComponent,
    BlueOperateAdComponent,
    FlowInfoAdComponent,
    FlowOperateAdComponent,
    OrderInfoAdComponent,
    VideoLiveAdComponent,
  ],
  entryComponents: [
    AcEcofAdComponent,
    AcDisableAdComponent,
    SerInfoAdComponent,
    TerAddAdComponent,
    TerBatchAddAdComponent,
    TerBasicConfigAdComponent,
    TerScrapAdComponent,
    TerFlowAdComponent,
    VAddAdComponent,
    VBasicConfigAdComponent,
    VScrapAdComponent,
    BlueAddAdComponent,
    BlueBasicConfigAdComponent,
    BlueScrapAdComponent,
    FlowChargeInlineAdComponent,
    FlowBatchRechargeAdComponent,
    OrderStatusSettingAdComponent,
    AcBatchDisabledAdComponent,
    AcBatchActiveAdComponent,
  ]
})
export class AdminModule { }
