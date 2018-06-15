

import {BoilerMainComponent} from './boiler-main/boiler-main.component';
import {BoilersComponent} from './boilers/boilers.component';
import {BoilerInfoComponent} from './boiler-info/boiler-info.component';

export const BoilersRouting = [
  {
    path: 'boilers',
    component: BoilerMainComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: BoilersComponent
      },
      {
        path: 'boiler-info',
        component: BoilerInfoComponent
      }
    ]
  }
];

