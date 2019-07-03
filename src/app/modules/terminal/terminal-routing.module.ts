
import {TerminalMainComponent} from './terminal-main/terminal-main.component';
import {TerminalListComponent} from './terminal-list/terminal-list.component';
import {TerConfigComponent} from './ter-config/ter-config.component';
import {MessagesComponent} from './messages/messages.component';
import {PlcAlarmComponent} from "./plc-alarm/plc-alarm.component";
import {TermListAdComponent} from "./administrator/term-list-ad/term-list-ad.component";
import {TermMainAdComponent} from "./administrator/term-main-ad/term-main-ad.component";

export const TerminalRoutingModule = [
  {
    path: 'terminal',
    component: TerminalMainComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: TerminalListComponent
      },
      {
        path: 'config/:code',
        component: TerConfigComponent
      },
      {
        path: 'messages/:code',
        component: MessagesComponent
      },
      {
        path: 'plc/:code',
        component: PlcAlarmComponent
      },
      {
        path: 'ad',
        component: TermMainAdComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: TermListAdComponent
          },
        ]
      }

    ]
  }
];
