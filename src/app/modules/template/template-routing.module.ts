

import {TemplateMainComponent} from "./template-main/template-main.component";
import {TemplateListComponent} from "./template-list/template-list.component";
import {EditTempComponent} from "./edit-temp/edit-temp.component";

export const TemplateRoutingModule = [
  {
    path: 'template',
    component: TemplateMainComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: TemplateListComponent
      },
      {
        path: 'edit/:uid/:name',
        component: EditTempComponent
      }
    ]
  }
];
