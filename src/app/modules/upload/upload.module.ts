import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFileComponent } from './add-file/add-file.component';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    NgZorroAntdModule
  ],
  declarations: [
    AddFileComponent
  ],
  entryComponents: [
    AddFileComponent
  ]
})
export class UploadModule { }
