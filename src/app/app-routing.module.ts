import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './global/main/main.component';



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
    component: MainComponent,
    // children:[
    //   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    //   {
    //     path: 'dashboard',
    //     component: DashboardComponent
    //   }
    // ]
  },
  {
    path: '**', // fallback router must in the last
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
