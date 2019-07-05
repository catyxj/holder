
import {MainFormalComponent} from "./main-formal/main-formal.component";

export const FormalRoutingModule = [
  {
    path: '',
    component: MainFormalComponent,
    /*children: [
      { path: '', redirectTo: 'terminal', pathMatch: 'full' },
      {
        path: 'terminal',
        component: TerMainAdComponent
      }
    ]*/
  }
];
