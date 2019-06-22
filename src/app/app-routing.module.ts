import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {NotFound404Component} from './global/not-found404/not-found404.component';
import {QiantianComponent} from './homepage/qiantian/qiantian.component';
import {VViewComponent} from "./v-view/v-view.component";
import {RuikongComponent} from "./homepage/ruikong/ruikong.component";
import {SignUpComponent} from "./register/sign-up/sign-up.component";
import {RecoverPasswordComponent} from "./register/recover-password/recover-password.component";



const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
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
    loadChildren: './modules/modules.module#ModulesModule'
  },
  {
    path: 'video-view/:url/:name/:num/:serialName/:serialNumber/:consoleOn',
    component: VViewComponent,
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
