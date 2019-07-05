


import {MainAdComponent} from "./main-ad/main-ad.component";
import {TerMainAdComponent} from "./terminal/ter-main-ad/ter-main-ad.component";
import {VMainAdComponent} from "./video/v-main-ad/v-main-ad.component";
import {BlueMainAdComponent} from "./bluetooth/blue-main-ad/blue-main-ad.component";
import {AcMainAdComponent} from "./account/ac-main-ad/ac-main-ad.component";
import {AcListAdComponent} from "./account/ac-list-ad/ac-list-ad.component";

export const AdminRoutingModule = [
  {
    path: '',
    component: MainAdComponent,
    children: [
      { path: '', redirectTo: 'terminal', pathMatch: 'full' },
      {
        path: 'terminal',
        component: TerMainAdComponent
      },
      {
        path: 'video',
        component: VMainAdComponent
      },
      {
        path: 'bluetooth',
        component: BlueMainAdComponent
      },
      {
        path: 'account',
        component: AcMainAdComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: AcListAdComponent
          }
        ]
      }
    ]
  }
];
