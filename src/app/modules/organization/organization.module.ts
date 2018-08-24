import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditInfoComponent } from './edit-info/edit-info.component';
import { AddAccountComponent } from './add-account/add-account.component';
import {FormsModule} from '@angular/forms';
import { AddInfoComponent } from './add-info/add-info.component';
import {NgZorroAntdModule} from "ng-zorro-antd";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule
  ],
  declarations: [
    EditInfoComponent,
    AddAccountComponent,
    AddInfoComponent
  ],
  entryComponents: [
    EditInfoComponent,
    AddAccountComponent,
    AddInfoComponent
  ]
})
export class OrganizationModule { }
