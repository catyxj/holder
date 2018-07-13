import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TerminalMainComponent} from './terminal-main/terminal-main.component';
import {TerminalListComponent} from './terminal-list/terminal-list.component';
import {TerConfigComponent} from './ter-config/ter-config.component';
import {MessagesComponent} from './messages/messages.component';

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
      }
    ]
  }
];
