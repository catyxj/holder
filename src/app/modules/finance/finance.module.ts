
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LayoutModule} from "@angular/cdk/layout";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FinanceRoutingModule} from "./finance-routing.module";
import { FinanceMainComponent } from './finance-main/finance-main.component';
import { InvoiceMainFiComponent } from './invoice/invoice-main-fi/invoice-main-fi.component';
import { InvoiceListFiComponent } from './invoice/invoice-list-fi/invoice-list-fi.component';
import { InvoiceInfoFiComponent } from './invoice/invoice-info-fi/invoice-info-fi.component';
import { InvoiceSetFiComponent } from './invoice/modals/invoice-set-fi/invoice-set-fi.component';



@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild( FinanceRoutingModule ),
    NgbModule,
    NgZorroAntdModule
  ],
  declarations: [
    FinanceMainComponent,
    InvoiceMainFiComponent,
    InvoiceListFiComponent,
    InvoiceInfoFiComponent,
    InvoiceSetFiComponent
  ],
  exports: [

  ],
  entryComponents: [
    InvoiceSetFiComponent
  ]
})
export class FinanceModule { }
