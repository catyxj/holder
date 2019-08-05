


import {MainAdComponent} from "./main-ad/main-ad.component";
import {TerMainAdComponent} from "./terminal/ter-main-ad/ter-main-ad.component";
import {VMainAdComponent} from "./video/v-main-ad/v-main-ad.component";
import {BlueMainAdComponent} from "./bluetooth/blue-main-ad/blue-main-ad.component";
import {AcMainAdComponent} from "./account/ac-main-ad/ac-main-ad.component";
import {AcListAdComponent} from "./account/ac-list-ad/ac-list-ad.component";
import {SerMainAdComponent} from "./service/ser-main-ad/ser-main-ad.component";
import {SerListAdComponent} from "./service/ser-list-ad/ser-list-ad.component";
import {TerListAdComponent} from "./terminal/ter-list-ad/ter-list-ad.component";
import {VListAdComponent} from "./video/v-list-ad/v-list-ad.component";
import {BlueListAdComponent} from "./bluetooth/blue-list-ad/blue-list-ad.component";
import {FlowMainAdComponent} from "./flow/flow-main-ad/flow-main-ad.component";
import {FlowListAdComponent} from "./flow/flow-list-ad/flow-list-ad.component";
import {OrderMainAdComponent} from "./order/order-main-ad/order-main-ad.component";
import {OrderListAdComponent} from "./order/order-list-ad/order-list-ad.component";
import {OvMainAdComponent} from "./overview/ov-main-ad/ov-main-ad.component";
import {OvDashboardAdComponent} from "./overview/ov-dashboard-ad/ov-dashboard-ad.component";
import {TerInfoAdComponent} from "./terminal/ter-info-ad/ter-info-ad.component";
import {TerOperateAdComponent} from "./terminal/ter-operate-ad/ter-operate-ad.component";
import {AcInfoAdComponent} from "./account/ac-info-ad/ac-info-ad.component";
import {AcOperateAdComponent} from "./account/ac-operate-ad/ac-operate-ad.component";
import {VOperateAdComponent} from "./video/v-operate-ad/v-operate-ad.component";
import {VInfoAdComponent} from "./video/v-info-ad/v-info-ad.component";
import {BlueInfoAdComponent} from "./bluetooth/blue-info-ad/blue-info-ad.component";
import {BlueOperateAdComponent} from "./bluetooth/blue-operate-ad/blue-operate-ad.component";
import {SerInfoAdComponent} from "./service/ser-info-ad/ser-info-ad.component";
import {FlowInfoAdComponent} from "./flow/flow-info-ad/flow-info-ad.component";
import {FlowOperateAdComponent} from "./flow/flow-operate-ad/flow-operate-ad.component";
import {OrderInfoAdComponent} from "./order/order-info-ad/order-info-ad.component";

export const AdminRoutingModule = [
  {
    path: '',
    component: MainAdComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        component: OvMainAdComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            component: OvDashboardAdComponent
          }
        ]
      },
      {
        path: 'terminal',
        component: TerMainAdComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: TerListAdComponent
          },
          {
            path: 'info/:uid/:page',
            component: TerInfoAdComponent
          },
          {
            path: 'operate/:uid',
            component: TerOperateAdComponent
          }
        ]
      },
      {
        path: 'video',
        component: VMainAdComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: VListAdComponent
          },
          {
            path: 'info/:uid/:page',
            component: VInfoAdComponent
          },
          {
            path: 'operate/:uid',
            component: VOperateAdComponent
          }
        ]
      },
      {
        path: 'bluetooth',
        component: BlueMainAdComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: BlueListAdComponent
          },
          {
            path: 'info/:uid/:page',
            component: BlueInfoAdComponent
          },
          {
            path: 'operate/:uid',
            component: BlueOperateAdComponent
          }
        ]
      },
      {
        path: 'account',
        component: AcMainAdComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: AcListAdComponent
          },
          {
            path: 'info/:uid/:page',
            component: AcInfoAdComponent
          },
          {
            path: 'operate/:uid/:name',
            component: AcOperateAdComponent
          }
        ]
      },
      {
        path: 'service',
        component: SerMainAdComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: SerListAdComponent
          },
          {
            path: 'info/:uid/:page',
            component: SerInfoAdComponent
          }
        ]
      },
      {
        path: 'flow',
        component: FlowMainAdComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: FlowListAdComponent
          },
          {
            path: 'info/:uid/:page',
            component: FlowInfoAdComponent
          },
          {
            path: 'operate/:uid',
            component: FlowOperateAdComponent
          }
        ]
      },
      {
        path: 'order',
        component: OrderMainAdComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: OrderListAdComponent
          },
          {
            path: 'info/:uid/:page',
            component: OrderInfoAdComponent
          }
        ]
      }
    ]
  }
];
