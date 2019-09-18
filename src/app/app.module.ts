import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import {NotFound404Component} from './global/not-found404/not-found404.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,
  MatInputModule
} from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import zh from '@angular/common/locales/zh';
import {NgxEchartsModule} from 'ngx-echarts';
import {BsDatepickerModule} from 'ngx-bootstrap';


import {HeaderComponent} from './global/header/header.component';
import {FooterComponent} from './global/footer/footer.component';
import {SidebarComponent} from './global/sidebar/sidebar.component';
import { RuikongComponent } from './homepage/ruikong/ruikong.component';
import { QiantianComponent } from './homepage/qiantian/qiantian.component';
import { SignUpComponent } from './register/sign-up/sign-up.component';
import { RecoverPasswordComponent } from './register/recover-password/recover-password.component';
import { DirMainComponent } from './modules/directives/dir-main/dir-main.component';
import { SignInComponent } from './register/sign-in/sign-in.component';
import { VideoLiveComponent } from './modules/directives/video-live/video-live.component';


import { ComfirmComponent } from './modules/directives/alert/comfirm/comfirm.component';
import { ErrorComponent } from './modules/directives/alert/error/error.component';
import { Err404Component } from './global/error/err404/err404.component';
import {ChargeMainDirComponent} from "./modules/directives/charge/charge-main-dir/charge-main-dir.component";
import {ChargeOverviewDirComponent} from "./modules/directives/charge/overview/charge-overview-dir/charge-overview-dir.component";
import {BillMainDirComponent} from "./modules/directives/charge/bill/bill-main-dir/bill-main-dir.component";
import {BillGeneralDirComponent} from "./modules/directives/charge/bill/bill-general-dir/bill-general-dir.component";
import {BillDetailDirComponent} from "./modules/directives/charge/bill/bill-detail-dir/bill-detail-dir.component";
import { OrderMainDirComponent } from './modules/directives/charge/order/order-main-dir/order-main-dir.component';
import { RenewalMainDirComponent } from './modules/directives/charge/renewal/renewal-main-dir/renewal-main-dir.component';
import { InvoiceMainDirComponent } from './modules/directives/charge/invoice/invoice-main-dir/invoice-main-dir.component';
import { OrderListDirComponent } from './modules/directives/charge/order/order-list-dir/order-list-dir.component';
import { OrderInfoDirComponent } from './modules/directives/charge/order/order-info-dir/order-info-dir.component';
import { RenewalListDirComponent } from './modules/directives/charge/renewal/renewal-list-dir/renewal-list-dir.component';
import { InvoiceListDirComponent } from './modules/directives/charge/invoice/invoice-list-dir/invoice-list-dir.component';
import { InvoiceInfoDirComponent } from './modules/directives/charge/invoice/invoice-info-dir/invoice-info-dir.component';
import { OrderServiceMainDirComponent } from './modules/directives/charge/order-service/order-service-main-dir/order-service-main-dir.component';
import { OrderServiceDashboardDirComponent } from './modules/directives/charge/order-service/order-service-dashboard-dir/order-service-dashboard-dir.component';
import { BluetoothOrderServiceDirComponent } from './modules/directives/charge/order-service/add/bluetooth-order-service-dir/bluetooth-order-service-dir.component';
import { TerminalOrderServiceDirComponent } from './modules/directives/charge/order-service/add/terminal-order-service-dir/terminal-order-service-dir.component';
import { VideoOrderServiceDirComponent } from './modules/directives/charge/order-service/add/video-order-service-dir/video-order-service-dir.component';
import { SensorOrderServiceDirComponent } from './modules/directives/charge/order-service/add/sensor-order-service-dir/sensor-order-service-dir.component';
import { LogoOrderServiceDirComponent } from './modules/directives/charge/order-service/upgrade/logo-order-service-dir/logo-order-service-dir.component';
import { VideoUpgradeOrderServiceDirComponent } from './modules/directives/charge/order-service/upgrade/video-upgrade-order-service-dir/video-upgrade-order-service-dir.component';
import { StorageOrderServiceDirComponent } from './modules/directives/charge/order-service/service/storage-order-service-dir/storage-order-service-dir.component';
import { PaymentOrderServiceDirComponent } from './modules/directives/charge/order-service/payment-order-service-dir/payment-order-service-dir.component';
import { TrafficOrderServiceDirComponent } from './modules/directives/charge/order-service/traffic-order-service-dir/traffic-order-service-dir.component';
import { AddressAddPurchaseDirComponent } from './modules/directives/charge/order-service/modals/address-add-purchase-dir/address-add-purchase-dir.component';
import { AddressEditInvioceDirComponent } from './modules/directives/charge/invoice/modals/address-edit-invioce-dir/address-edit-invioce-dir.component';



registerLocaleData(zh);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    NotFound404Component,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    QiantianComponent,
    RuikongComponent,
    SignUpComponent,
    RecoverPasswordComponent,
    DirMainComponent,
    SignInComponent,
    ComfirmComponent,
    ErrorComponent,
    VideoLiveComponent,
    Err404Component,
    ChargeMainDirComponent,
    ChargeOverviewDirComponent,
    BillMainDirComponent,
    BillGeneralDirComponent,
    BillDetailDirComponent,
    OrderMainDirComponent,
    RenewalMainDirComponent,
    InvoiceMainDirComponent,
    OrderListDirComponent,
    OrderInfoDirComponent,
    RenewalListDirComponent,
    InvoiceListDirComponent,
    InvoiceInfoDirComponent,
    OrderServiceMainDirComponent,
    OrderServiceDashboardDirComponent,
    BluetoothOrderServiceDirComponent,
    TerminalOrderServiceDirComponent,
    VideoOrderServiceDirComponent,
    SensorOrderServiceDirComponent,
    LogoOrderServiceDirComponent,
    VideoUpgradeOrderServiceDirComponent,
    StorageOrderServiceDirComponent,
    PaymentOrderServiceDirComponent,
    TrafficOrderServiceDirComponent,
    AddressAddPurchaseDirComponent,
    AddressEditInvioceDirComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    AngularFontAwesomeModule,
    NgZorroAntdModule,
    NgxEchartsModule,
    // AdminModule,
    // FormalModule
  ],
  entryComponents: [
    ComfirmComponent,
    AddressAddPurchaseDirComponent,
    AddressEditInvioceDirComponent
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: NZ_I18N, useValue: zh_CN },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
