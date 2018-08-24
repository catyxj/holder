import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { SetModalComponent } from './set-modal/set-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ManagementComponent } from './management/management.component';
import {NgZorroAntdModule} from "ng-zorro-antd";


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    NgbModule,
    NgZorroAntdModule,
  ],
  declarations: [
    SetModalComponent,
    ManagementComponent,
  ],
  entryComponents: [
    SetModalComponent,
    ManagementComponent,
  ]
})
export class UserAccountModule { }
