import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { TerminalRoutingModule } from './terminal-routing.module';
import { MessagesComponent } from './messages/messages.component';
import { TerConfigComponent } from './ter-config/ter-config.component';
import { TerminalListComponent } from './terminal-list/terminal-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddTerminalComponent } from './add-terminal/add-terminal.component';
import { GroupConfigComponent } from './group-config/group-config.component';
import { EditTerminalComponent } from './edit-terminal/edit-terminal.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {
  MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule,
  MatMenuModule
} from '@angular/material';
import { GroupAddComponent } from './group-add/group-add.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { AlarmRuleComponent } from './alarm-rule/alarm-rule.component';
import { RangeConfigComponent } from './range-config/range-config.component';
import { AddTemplateComponent } from './add-template/add-template.component';
import { PlcAlarmComponent } from './plc-alarm/plc-alarm.component';
import { TermListAdComponent } from './administrator/term-list-ad/term-list-ad.component';
import { TermMainAdComponent } from './administrator/term-main-ad/term-main-ad.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatCheckboxModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    NgZorroAntdModule,
    RouterModule.forChild(TerminalRoutingModule)
  ],
  declarations: [
    MessagesComponent,
    TerConfigComponent,
    TerminalListComponent,
    AddTerminalComponent,
    GroupConfigComponent,
    EditTerminalComponent,
    GroupAddComponent,
    AlarmRuleComponent,
    RangeConfigComponent,
    AddTemplateComponent,
    PlcAlarmComponent,
    TermListAdComponent,
    TermMainAdComponent],
  entryComponents: [
    AddTerminalComponent,
    GroupConfigComponent,
    EditTerminalComponent,
    GroupAddComponent,
    AlarmRuleComponent,
    RangeConfigComponent,
    AddTemplateComponent
  ]
})
export class TerminalModule { }
