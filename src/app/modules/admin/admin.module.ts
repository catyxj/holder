
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LayoutModule} from "@angular/cdk/layout";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {AdminRoutingModule} from "./admin-routing.module";
import {MainAdComponent} from "./main-ad/main-ad.component";
import { TerMainAdComponent } from './terminal/ter-main-ad/ter-main-ad.component';
import { VMainAdComponent } from './video/v-main-ad/v-main-ad.component';
import { BlueMainAdComponent } from './bluetooth/blue-main-ad/blue-main-ad.component';
import { AcMainAdComponent } from './account/ac-main-ad/ac-main-ad.component';
import { AcListAdComponent } from './account/ac-list-ad/ac-list-ad.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule.forChild( AdminRoutingModule ),
    NgbModule,
    NgZorroAntdModule,
  ],
  declarations: [
    MainAdComponent,
    TerMainAdComponent,
    VMainAdComponent,
    BlueMainAdComponent,
    AcMainAdComponent,
    AcListAdComponent
  ],
  exports: [

  ]
})
export class AdminModule { }
