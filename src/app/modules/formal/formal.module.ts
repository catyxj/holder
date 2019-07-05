
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LayoutModule} from "@angular/cdk/layout";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormalRoutingModule} from "./formal-routing.module";
import {MainFormalComponent} from "./main-formal/main-formal.component";

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule.forChild( FormalRoutingModule ),
    NgbModule,
    NgZorroAntdModule,
  ],
  declarations: [
    MainFormalComponent
  ],
  exports: [

  ]
})
export class FormalModule { }
