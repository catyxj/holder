import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerminalRoutingModule } from './terminal-routing.module';
import { TerminalMainComponent } from './terminal-main/terminal-main.component';

@NgModule({
  imports: [
    CommonModule,
    TerminalRoutingModule
  ],
  declarations: [TerminalMainComponent]
})
export class TerminalModule { }
