
import {ProfileMainComponent} from './profile-main/profile-main.component';
import {PortraitComponent} from './portrait/portrait.component';
import {InfoComponent} from './info/info.component';
import {PasswordComponent} from './password/password.component';


export const ProfileRouting = [
  {
    path: '',
    component: ProfileMainComponent,
    children: [
      { path: '', redirectTo: 'portrait', pathMatch: 'full' },
      {
        path: 'portrait',
        component: PortraitComponent
      },
      {
        path: 'info',
        component: InfoComponent
      },
      {
        path: 'password',
        component: PasswordComponent
      }
    ]
  }
];
