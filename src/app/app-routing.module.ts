import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {NotFound404Component} from './global/not-found404/not-found404.component';
import {QiantianComponent} from './homepage/qiantian/qiantian.component';
import {RuikongComponent} from "./homepage/ruikong/ruikong.component";
import {SignUpComponent} from "./register/sign-up/sign-up.component";
import {RecoverPasswordComponent} from "./register/recover-password/recover-password.component";
import {MainAdComponent} from "./modules/admin/main-ad/main-ad.component";
import {UserloginGuard} from "./shared/userlogin.guard";





const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: SignUpComponent
  },
  {
    path: 'recover-password',
    component: RecoverPasswordComponent
  },
  {
    path: 'admin',
    component: MainComponent,
    children: [
      // {
      //   path: '', redirectTo: 'ad', pathMatch: 'full'
      // },
      {
        path: 'ad',
        // component: MainAdComponent,
        loadChildren: './modules/admin/admin.module#AdminModule',
        canActivate: [UserloginGuard]
      },
      {
        path: 'formal',
        loadChildren: './modules/formal/formal.module#FormalModule',
        canActivate: [UserloginGuard]
      },
    ]
    // loadChildren: './modules/modules.module#ModulesModule'
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
    component: NotFound404Component
  },
  {
    path: '**', // fallback router must in the last
    component: NotFound404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
