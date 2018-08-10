import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {NotFound404Component} from './global/not-found404/not-found404.component';
import {UserloginGuard} from './shared/userlogin.guard';
import {TestPageComponent} from "./test-page/test-page.component";
import {UserResolver} from "./shared/user.service";


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
    path: 'admin',
    component: MainComponent
    /*children: [
      { path: '', redirectTo: 'monitor', pathMatch: 'full' },
      {
        path: 'monitor',
        component: MonitorMainComponent
      },
      {
        path: 'boilers',
        component: BoilersComponent
      }
    ]*/
  },
  {
    path: '404',
    component: NotFound404Component
  },
  {
    path: 'test',
    component: TestPageComponent
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
