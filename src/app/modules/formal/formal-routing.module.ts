
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
          }
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
          }
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
          }
        ]
      }
    ]
  }
];
