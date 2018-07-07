import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BoilersComponent } from './boilers/boilers.component';
import { BoilerInfoComponent } from './boiler-info/boiler-info.component';

import {BoilersRouting} from './boilers-routing.module';
import {FormsModule} from '@angular/forms';
import { AddBoilerComponent } from './add-boiler/add-boiler.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {BaiduMapModule} from 'angular2-baidu-map';
import { EditBoilerComponent } from './edit-boiler/edit-boiler.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { EditMaintainComponent } from './edit-maintain/edit-maintain.component';
import { TerBindComponent } from './ter-bind/ter-bind.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    MatExpansionModule,
    RouterModule.forChild(BoilersRouting),
    BaiduMapModule.forRoot({ak: 'bDCh2N15YYodpt1wns4YPC7XFynjDx60'})
  ],
  declarations: [
    BoilersComponent,
    BoilerInfoComponent,
    AddBoilerComponent,
    EditBoilerComponent,
    EditAddressComponent,
    EditMaintainComponent,
    TerBindComponent
  ],
  entryComponents: [
    AddBoilerComponent,
    EditBoilerComponent,
    EditAddressComponent,
    EditMaintainComponent
  ]
})
export class BoilersModule { }
