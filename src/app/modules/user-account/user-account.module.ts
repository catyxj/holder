import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { SetModalComponent } from './set-modal/set-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    NgbModule,
  ],
  declarations: [
    SetModalComponent,
  ],
  entryComponents: [
    SetModalComponent
  ]
})
export class UserAccountModule { }
