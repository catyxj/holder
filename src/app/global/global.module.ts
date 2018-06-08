import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatMenuModule, MatSortModule } from '@angular/material';
import { SidebarComponent } from './sidebar/sidebar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTreeModule} from '@angular/material/tree';
import {GlobalRoutingModule} from './global-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSortModule,
    MatTreeModule,
    NgbModule,
    GlobalRoutingModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    SidebarComponent,
    DashboardComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    SidebarComponent,
    RouterModule
  ]
})
export class GlobalModule { }
