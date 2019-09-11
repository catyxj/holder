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
    ]
    // loadChildren: './modules/modules.module#ModulesModule'
  },
  {
    path: 'dir',
    component: DirMainComponent,
    children: [
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
        component: OrderMainDirComponent
      },
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
