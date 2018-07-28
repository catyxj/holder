import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateListComponent } from './template-list/template-list.component';
import { EditTempComponent } from './edit-temp/edit-temp.component';
import {TemplateRoutingModule} from './template-routing.module';
import {RouterModule} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatGridListModule, MatMenuModule} from "@angular/material";
import {NgZorroAntdModule} from "ng-zorro-antd";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    MatMenuModule,
    MatGridListModule,
    NgZorroAntdModule,
    RouterModule.forChild(TemplateRoutingModule)
  ],
  declarations: [
    TemplateListComponent,
    EditTempComponent
  ]
})
export class TemplateModule { }
