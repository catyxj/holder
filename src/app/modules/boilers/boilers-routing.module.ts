

import {BoilerMainComponent} from './boiler-main/boiler-main.component';
import {BoilersComponent} from './boilers/boilers.component';
import {BoilerInfoComponent} from './boiler-info/boiler-info.component';
import {BoilerTemplatesComponent} from "./templates/templates.component";

export const BoilersRouting = [
  {
    path: '',
    component: BoilerMainComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: BoilersComponent
      },
      {
        path: 'equipment-info/:uid',
        component: BoilerInfoComponent
      },
      {
        path: 'templates',
        component: BoilerTemplatesComponent
      }
    ]
  }
];

