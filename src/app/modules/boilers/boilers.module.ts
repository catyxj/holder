import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { BoilersComponent } from './boilers/boilers.component';
import { BoilerInfoComponent } from './boiler-info/boiler-info.component';

import {BoilersRouting} from './boilers-routing.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BoilersRouting),
  ],
  declarations: [
    BoilersComponent,
    BoilerInfoComponent
  ]
})
export class BoilersModule { }
