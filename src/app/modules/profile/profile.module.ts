import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info/info.component';
import { PortraitComponent } from './portrait/portrait.component';
import { PasswordComponent } from './password/password.component';
import {ProfileRouting} from './profile-routing.module';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProfileRouting),
    FormsModule,
  ],
  declarations: [
    InfoComponent,
    PortraitComponent,
    PasswordComponent]
})
export class ProfileModule { }
