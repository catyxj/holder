


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
          }
        ]
      }
    ]
  }
];
