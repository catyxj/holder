import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {NotFound404Component} from './global/not-found404/not-found404.component';
import {QiantianComponent} from './homepage/qiantian/qiantian.component';
import {RuikongComponent} from "./homepage/ruikong/ruikong.component";
import {SignUpComponent} from "./register/sign-up/sign-up.component";
import {RecoverPasswordComponent} from "./register/recover-password/recover-password.component";
import {UserloginGuard} from "./shared/userlogin.guard";
import {DirMainComponent} from "./modules/directives/dir-main/dir-main.component";
import {SignInComponent} from "./register/sign-in/sign-in.component";
import {VideoLiveComponent} from "./modules/directives/video-live/video-live.component";
import {Err404Component} from "./global/error/err404/err404.component";
import {ChargeMainDirComponent} from "./modules/directives/charge/charge-main-dir/charge-main-dir.component";
import {ChargeOverviewDirComponent} from "./modules/directives/charge/overview/charge-overview-dir/charge-overview-dir.component";
import {BillMainDirComponent} from "./modules/directives/charge/bill/bill-main-dir/bill-main-dir.component";
import {BillDetailDirComponent} from "./modules/directives/charge/bill/bill-detail-dir/bill-detail-dir.component";
import {BillGeneralDirComponent} from "./modules/directives/charge/bill/bill-general-dir/bill-general-dir.component";
import {OrderMainDirComponent} from "./modules/directives/charge/order/order-main-dir/order-main-dir.component";
import {RenewalMainDirComponent} from "./modules/directives/charge/renewal/renewal-main-dir/renewal-main-dir.component";
import {InvoiceMainDirComponent} from "./modules/directives/charge/invoice/invoice-main-dir/invoice-main-dir.component";
import {OrderInfoDirComponent} from "./modules/directives/charge/order/order-info-dir/order-info-dir.component";
import {OrderListDirComponent} from "./modules/directives/charge/order/order-list-dir/order-list-dir.component";
import {RenewalListDirComponent} from "./modules/directives/charge/renewal/renewal-list-dir/renewal-list-dir.component";
import {InvoiceListDirComponent} from "./modules/directives/charge/invoice/invoice-list-dir/invoice-list-dir.component";
import {InvoiceInfoDirComponent} from "./modules/directives/charge/invoice/invoice-info-dir/invoice-info-dir.component";
import {OrderServiceMainDirComponent} from "./modules/directives/charge/order-service/order-service-main-dir/order-service-main-dir.component";
import {OrderServiceDashboardDirComponent} from "./modules/directives/charge/order-service/order-service-dashboard-dir/order-service-dashboard-dir.component";
import {BluetoothOrderServiceDirComponent} from "./modules/directives/charge/order-service/add/bluetooth-order-service-dir/bluetooth-order-service-dir.component";
import {TerminalOrderServiceDirComponent} from "./modules/directives/charge/order-service/add/terminal-order-service-dir/terminal-order-service-dir.component";
import {VideoOrderServiceDirComponent} from "./modules/directives/charge/order-service/add/video-order-service-dir/video-order-service-dir.component";
import {SensorOrderServiceDirComponent} from "./modules/directives/charge/order-service/add/sensor-order-service-dir/sensor-order-service-dir.component";
import {LogoOrderServiceDirComponent} from "./modules/directives/charge/order-service/upgrade/logo-order-service-dir/logo-order-service-dir.component";
import {StorageOrderServiceDirComponent} from "./modules/directives/charge/order-service/service/storage-order-service-dir/storage-order-service-dir.component";
import {PaymentOrderServiceDirComponent} from "./modules/directives/charge/order-service/payment-order-service-dir/payment-order-service-dir.component";
import {TrafficOrderServiceDirComponent} from "./modules/directives/charge/order-service/traffic-order-service-dir/traffic-order-service-dir.component";
import {DeliveryMainComponent} from "./modules/directives/operator/delivery/delivery-main/delivery-main.component";
import {DeliveryListComponent} from "./modules/directives/operator/delivery/delivery-list/delivery-list.component";
import {DeliveryInfoComponent} from "./modules/directives/operator/delivery/delivery-info/delivery-info.component";
import {AgreementComponent} from "./register/agreement/agreement.component";




const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    children: [
      {
        path: 'login',
        component: SignInComponent
      },
      {
        path: 'register',
        component: SignUpComponent
      }
    ]
  },
  {
    path: 'agreement',
    component: AgreementComponent
  },
  {
    path: 'recover-password',
    component: RecoverPasswordComponent
  },
  {
    path: 'admin',
    component: MainComponent,
    children: [
      {
        path: 'ad',
        loadChildren: './modules/admin/admin.module#AdminModule',
        canActivate: [UserloginGuard]
      },
      {
        path: 'formal',
        loadChildren: './modules/formal/formal.module#FormalModule',
        canActivate: [UserloginGuard]
      },
      {
        path: 'ordinary',
        loadChildren: './modules/ordinary/ordinary.module#OrdinaryModule',
        canActivate: [UserloginGuard]
      },
      {
        path: 'service',
        loadChildren: './modules/service/service.module#ServiceModule',
        canActivate: [UserloginGuard]
      },
      {
        path: 'finance',
        loadChildren: './modules/finance/finance.module#FinanceModule',
        canActivate: [UserloginGuard]
      },
      {
        path: 'operator/delivery',
        component: DeliveryMainComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: DeliveryListComponent
          },
          {
            path: 'info/:uid/:page',
            component: DeliveryInfoComponent
          },
        ],
        canActivate: [UserloginGuard]
      },
    ]
    // loadChildren: './modules/modules.module#ModulesModule'
  },
  {
    path: 'dir',
    component: DirMainComponent,
    children: [
      {
        path: 'charge/invoice/info/:amount/:sn',
        component: InvoiceInfoDirComponent
      },
      /*{
        path: 'charge/purchase/order/bluetooth',
        component: BluetoothOrderServiceDirComponent
      },
      {
        path: 'charge/purchase/order/terminal',
        component: TerminalOrderServiceDirComponent
      },*/
      {
        path: 'charge/purchase/order/:type',
        component: VideoOrderServiceDirComponent
      },
      /*{
        path: 'charge/purchase/order/sensor',
        component: SensorOrderServiceDirComponent
      },*/
      {
        path: 'charge/purchase/upgrade/:type',
        component: LogoOrderServiceDirComponent
      },
      {
        path: 'charge/purchase/storage',
        component: StorageOrderServiceDirComponent
      },
      {
        path: 'charge/purchase/traffic',
        component: TrafficOrderServiceDirComponent
      },
      {
        path: 'charge/purchase/payment/:uid',
        component: PaymentOrderServiceDirComponent
      },

      // 管理员
      // {
      //   path: 'ad/account-info/:uid',
      //   component: AcInfoAdComponent
      // },
      // {
      //   path: 'ad/account-operate/:uid/:name',
      //   component: AcOperateAdComponent
      // },
      // {
      //   path: 'ad/service-info/:uid',
      //   component: SerInfoAdComponent
      // },
      // {
      //   path: 'ad/terminal-info/:uid',
      //   component: TerInfoAdComponent
      // },
      // {
      //   path: 'ad/terminal-operate/:uid',
      //   component: TerOperateAdComponent
      // },
      // {
      //   path: 'ad/video-info/:uid',
      //   component: VInfoAdComponent
      // },
      // {
      //   path: 'ad/video-operate/:uid',
      //   component: VOperateAdComponent
      // },
      // {
      //   path: 'ad/blue-info/:uid',
      //   component: BlueInfoAdComponent
      // },
      // {
      //   path: 'ad/blue-operate/:uid',
      //   component: BlueOperateAdComponent
      // },
      // {
      //   path: 'ad/flow-info/:uid',
      //   component: FlowInfoAdComponent
      // },
      // {
      //   path: 'ad/flow-operate/:uid',
      //   component: FlowOperateAdComponent
      // },
      // {
      //   path: 'ad/order-info/:uid',
      //   component: OrderInfoAdComponent
      // },

    ]
  },
  {
    path: 'charge',
    component: ChargeMainDirComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        component: ChargeOverviewDirComponent
      },
      {
        path: 'bill',
        component: BillMainDirComponent,
        children: [
          { path: '', redirectTo: 'general', pathMatch: 'full' },
          {
            path: 'general',
            component: BillGeneralDirComponent
          },
          {
            path: 'detail',
            component: BillDetailDirComponent
          }
        ]
      },
      {
        path: 'order',
        component: OrderMainDirComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: OrderListDirComponent
          },
          {
            path: 'info/:uid/:page',
            component: OrderInfoDirComponent
          }
        ]
      },
      {
        path: 'renewal',
        component: RenewalMainDirComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: RenewalListDirComponent
          }
        ]
      },
      {
        path: 'invoice',
        component: InvoiceMainDirComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: InvoiceListDirComponent
          },
          {
            path: 'info/:amount',
            component: InvoiceInfoDirComponent
          }
        ]
      },
      {
        path: 'purchase',
        component: OrderServiceMainDirComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            component: OrderServiceDashboardDirComponent
          },
          {
            path: 'order/bluetooth',
            component: BluetoothOrderServiceDirComponent
          },
          {
            path: 'order/terminal',
            component: TerminalOrderServiceDirComponent
          },
          {
            path: 'order/video',
            component: VideoOrderServiceDirComponent
          },
          {
            path: 'order/sensor',
            component: SensorOrderServiceDirComponent
          },
          {
            path: 'upgrade/:type',
            component: LogoOrderServiceDirComponent
          },
          {
            path: 'storage',
            component: StorageOrderServiceDirComponent
          },
          {
            path: 'payment',
            component: PaymentOrderServiceDirComponent
          },
        ]
      }
    ]
  },
  {
    path: 'video-live/:uid',
    component: VideoLiveComponent
  },
  {
    path: 'qiantian',
    component: QiantianComponent
  },
  {
    path: 'ruikong',
    component: RuikongComponent
  },
  {
    path: '404',
    component: Err404Component
  },
  {
    path: '**', // fallback router must in the last
    component: Err404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {preloadingStrategy: PreloadAllModules}
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
