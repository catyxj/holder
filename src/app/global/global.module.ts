import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatMenuModule } from '@angular/material';
import { SidebarComponent } from './sidebar/sidebar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {GlobalRoutingModule} from './global-routing.module';
import {ModulesModule} from '../modules/modules.module';
import {NgZorroAntdModule} from "ng-zorro-antd";



@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule.forChild( GlobalRoutingModule ),
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    ModulesModule,
    NgbModule,
    NgZorroAntdModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,

  ]
})
export class GlobalModule { }
