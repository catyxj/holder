
import {MainFormalComponent} from "./main-formal/main-formal.component";
import {AcccountMainComponent} from "./account/acccount-main/acccount-main.component";
import {UsersMainComponent} from "./users/users-main/users-main.component";
import {UserListFormalComponent} from "./users/user-list-formal/user-list-formal.component";
import {AccountInfoFormalComponent} from "./account/account-info-formal/account-info-formal.component";
import {ServiceMainFormalComponent} from "./service/service-main-formal/service-main-formal.component";
import {ServiceListFormalComponent} from "./service/service-list-formal/service-list-formal.component";
import {MRecordMainFormalComponent} from "./maintain/m-record/m-record-main-formal/m-record-main-formal.component";
import {MRecordListFormalComponent} from "./maintain/m-record/m-record-list-formal/m-record-list-formal.component";
import {MAccountMainFormalComponent} from "./maintain/m-account/m-account-main-formal/m-account-main-formal.component";
import {MAccountListFormalComponent} from "./maintain/m-account/m-account-list-formal/m-account-list-formal.component";
import {MTemplateMainFormalComponent} from "./maintain/m-template/m-template-main-formal/m-template-main-formal.component";
import {MTemplateListFormalComponent} from "./maintain/m-template/m-template-list-formal/m-template-list-formal.component";
import {ServiceInfoFormalComponent} from "./service/service-info-formal/service-info-formal.component";
import {BlueMainFormalComponent} from "./bluetooth/blue-main-formal/blue-main-formal.component";
import {BlueListFormalComponent} from "./bluetooth/blue-list-formal/blue-list-formal.component";
import {VideoMainFormalComponent} from "./video/video-main-formal/video-main-formal.component";
import {VideoListFormalComponent} from "./video/video-list-formal/video-list-formal.component";
import {TerminalMainFormalComponent} from "./terminal/terminal-main-formal/terminal-main-formal.component";
import {TerminalListFormalComponent} from "./terminal/terminal-list-formal/terminal-list-formal.component";
import {TerminalInfoFormalComponent} from "./terminal/terminal-info-formal/terminal-info-formal.component";
import {TerminalMessageFormalComponent} from "./terminal/terminal-message-formal/terminal-message-formal.component";
import {TerminalConfigFormalComponent} from "./terminal/terminal-config-formal/terminal-config-formal.component";
import {BlueInfoFormalComponent} from "./bluetooth/blue-info-formal/blue-info-formal.component";
import {TerminalOperateFormalComponent} from "./terminal/terminal-operate-formal/terminal-operate-formal.component";
import {BlueOperateFormalComponent} from "./bluetooth/blue-operate-formal/blue-operate-formal.component";
import {UserDetailFormalComponent} from "./users/user-detail-formal/user-detail-formal.component";
import {AccountOperateFormalComponent} from "./account/account-operate-formal/account-operate-formal.component";
import {AccountOrderDetailFormalComponent} from "./account/account-order-detail-formal/account-order-detail-formal.component";
import {ServiceDetailFormalComponent} from "./service/service-detail-formal/service-detail-formal.component";
import {VideoInfoFormalComponent} from "./video/video-info-formal/video-info-formal.component";
import {VideoOperateFormalComponent} from "./video/video-operate-formal/video-operate-formal.component";
import {MRecordInfoFormalComponent} from "./maintain/m-record/m-record-info-formal/m-record-info-formal.component";
import {TerminalCustomizeFormalComponent} from "./terminal/terminal-customize-formal/terminal-customize-formal.component";
import {TerminalChannelConfigFormalComponent} from "./terminal/terminal-channel-config-formal/terminal-channel-config-formal.component";
import {TemplateMainFormalComponent} from "./template/template-main-formal/template-main-formal.component";
import {TemplateListFormalComponent} from "./template/template-list-formal/template-list-formal.component";
import {TerminalCalculateConfigComponent} from "./terminal/terminal-calculate-config/terminal-calculate-config.component";
import {TerCal1Component} from "./terminal/calculate/ter-cal1/ter-cal1.component";
import {TerCal2Component} from "./terminal/calculate/ter-cal2/ter-cal2.component";
import {TerCal3Component} from "./terminal/calculate/ter-cal3/ter-cal3.component";
import {TemplateAddMainComponent} from "./template/add/template-add-main/template-add-main.component";
import {TemplateAddEptComponent} from "./template/add/template-add-ept/template-add-ept.component";
import {TemplateConfigFormalComponent} from "./template/template-config-formal/template-config-formal.component";
import {TemplateBatchDeleteFComponent} from "./template/template-batch-delete-f/template-batch-delete-f.component";
import {TemplateBatchAllocateComponent} from "./template/template-batch-allocate/template-batch-allocate.component";
import {TemplateChannelFormalComponent} from "./template/template-channel-formal/template-channel-formal.component";
import {TemplateCustomizeFormalComponent} from "./template/template-customize-formal/template-customize-formal.component";
import {TempCalMainComponent} from "./template/calculate/temp-cal-main/temp-cal-main.component";
import {MAccountInfoFormalComponent} from "./maintain/m-account/m-account-info-formal/m-account-info-formal.component";
import {MAccountProductFComponent} from "./maintain/m-account/m-account-product-f/m-account-product-f.component";
import {MTempBatchAllocateFComponent} from "./maintain/m-template/m-temp-batch-allocate-f/m-temp-batch-allocate-f.component";
import {MTempBatchDeleteFComponent} from "./maintain/m-template/m-temp-batch-delete-f/m-temp-batch-delete-f.component";
import {MAcBatchAddComponent} from "./maintain/m-account/product/m-ac-batch-add/m-ac-batch-add.component";
import {MAcBatchDeleteComponent} from "./maintain/m-account/product/m-ac-batch-delete/m-ac-batch-delete.component";

export const FormalRoutingModule = [
  {
    path: '',
    component: MainFormalComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      {
        path: 'users',
        component: UsersMainComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: UserListFormalComponent
          },
          {
            path: 'info/:uid/:page',
            component: UserDetailFormalComponent
          }
        ]
      },
      {
        path: 'account',
        component: AcccountMainComponent,
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          {
            path: 'info',
            component: AccountInfoFormalComponent
          },
          {
            path: 'operate/:uid/:name',
            component: AccountOperateFormalComponent
          },
          {
            path: 'order-detail/:uid',
            component: AccountOrderDetailFormalComponent
          },
        ]
      },
      {
        path: 'service',
        component: ServiceMainFormalComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: ServiceListFormalComponent
          },
          {
            path: 'info',
            component: ServiceInfoFormalComponent
          },
          {
            path: 'detail/:uid/:page',
            component: ServiceDetailFormalComponent
          }
        ]
      },
      {
        path: 'maintenance-record',
        component: MRecordMainFormalComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: MRecordListFormalComponent
          },
          {
            path: 'info/:uid/:page',
            component: MRecordInfoFormalComponent
          }
        ]
      },
      {
        path: 'maintenance-account',
        component: MAccountMainFormalComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: MAccountListFormalComponent
          },
          {
            path: 'info/:uid/:page',
            component: MAccountInfoFormalComponent
          },
          {
            path: 'product/:uid',
            component: MAccountProductFComponent
          },
          {
            path: 'batch-delete/:uid',
            component: MAcBatchDeleteComponent
          },
          {
            path: 'batch-add/:uid',
            component: MAcBatchAddComponent
          },
        ]
      },
      {
        path: 'maintenance-template',
        component: MTemplateMainFormalComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: MTemplateListFormalComponent
          },
          {
            path: 'batch-delete',
            component: MTempBatchDeleteFComponent
          },
          {
            path: 'batch-allocate',
            component: MTempBatchAllocateFComponent
          },
        ]
      },
      {
        path: 'bluetooth',
        component: BlueMainFormalComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: BlueListFormalComponent
          },
          {
            path: 'info/:uid/:page',
            component: BlueInfoFormalComponent
          },
          {
            path: 'operate/:uid',
            component: BlueOperateFormalComponent
          }
        ]
      },
      {
        path: 'video',
        component: VideoMainFormalComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: VideoListFormalComponent
          },
          {
            path: 'info/:uid/:page',
            component: VideoInfoFormalComponent
          },
          {
            path: 'operate/:uid',
            component: VideoOperateFormalComponent
          }
        ]
      },
      {
        path: 'terminal',
        component: TerminalMainFormalComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: TerminalListFormalComponent
          },
          {
            path: 'info/:uid/:code/:page',
            component: TerminalInfoFormalComponent
          },
          {
            path: 'messages/:uid/:code',
            component: TerminalMessageFormalComponent
          },
          {
            path: 'config/:uid/:code',
            component: TerminalConfigFormalComponent
          },
          {
            path: 'channel-config/:uid/:code',
            component: TerminalChannelConfigFormalComponent
          },
          {
            path: 'operate/:uid',
            component: TerminalOperateFormalComponent
          },
          {
            path: 'customize/:uid/:code',
            component: TerminalCustomizeFormalComponent
          },
          {
            path: 'calculate-list/:uid/:code',
            component: TerminalCalculateConfigComponent
          },
          {
            path: 'calculate1/:uid/:code',
            component: TerCal1Component
          },
          {
            path: 'calculate2/:uid/:code',
            component: TerCal2Component
          },
          {
            path: 'calculate3/:uid/:code',
            component: TerCal3Component
          }
        ]
      },
      {
        path: 'template',
        component: TemplateMainFormalComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: TemplateListFormalComponent
          },
          {
            path: 'batch-delete',
            component: TemplateBatchDeleteFComponent
          },
          {
            path: 'batch-allocate',
            component: TemplateBatchAllocateComponent
          },
          {
            path: 'config/:uid/:page',
            component: TemplateConfigFormalComponent
          },
          {
            path: 'add1',
            component: TemplateAddMainComponent,
            children: [
              {
                path: 'equip',
                component: TemplateAddEptComponent
              },
            ]
          },
          {
            path: 'channel-config/:uid',
            component: TemplateChannelFormalComponent
          },
          {
            path: 'customize/:uid',
            component: TemplateCustomizeFormalComponent
          },
          {
            path: 'calculate/:uid',
            component: TempCalMainComponent
          },
        ]
      },
    ]
  }
];
