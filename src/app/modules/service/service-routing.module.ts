


import {MaintainProdMainSerComponent} from "./maintain-prod/maintain-prod-main-ser/maintain-prod-main-ser.component";
import {MainSerComponent} from "./main-ser/main-ser.component";
import {MaintainRecordMainSerComponent} from "./maintain-record/maintain-record-main-ser/maintain-record-main-ser.component";
import {AcMainSerComponent} from "./account/ac-main-ser/ac-main-ser.component";
import {MaintainProdListSerComponent} from "./maintain-prod/maintain-prod-list-ser/maintain-prod-list-ser.component";
import {MaintainRecordListSerComponent} from "./maintain-record/maintain-record-list-ser/maintain-record-list-ser.component";
import {AcInfoSerComponent} from "./account/ac-info-ser/ac-info-ser.component";

export const ServiceRoutingModule = [
  {
    path: '',
    component: MainSerComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      {
        path: 'products',
        component: MaintainProdMainSerComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: MaintainProdListSerComponent,
          }
        ]
      },
      {
        path: 'records',
        component: MaintainRecordMainSerComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: MaintainRecordListSerComponent,
          }
        ]
      },
      {
        path: 'account',
        component: AcMainSerComponent,
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          {
            path: 'info',
            component: AcInfoSerComponent,
          }
        ]
      }
    ]
  }
];
