import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoilersComponent } from './boilers/boilers.component';
import { BoilerMainComponent } from './boiler-main/boiler-main.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BoilersComponent, BoilerMainComponent]
})
export class BoilersModule { }
