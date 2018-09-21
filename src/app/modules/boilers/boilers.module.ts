import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BoilersComponent } from './boilers/boilers.component';
import { BoilerInfoComponent } from './boiler-info/boiler-info.component';

import {BoilersRouting} from './boilers-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddBoilerComponent } from './add-boiler/add-boiler.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { EditBoilerComponent } from './edit-boiler/edit-boiler.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { EditMaintainComponent } from './edit-maintain/edit-maintain.component';
import { TerBindComponent } from './ter-bind/ter-bind.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material';
import {NgZorroAntdModule} from "ng-zorro-antd";
import { JoinClusterComponent } from './join-cluster/join-cluster.component';
import { BoilerTemplatesComponent } from './templates/templates.component';
import { AddEquiptemplateComponent } from './add-equiptemplate/add-equiptemplate.component';
import { EditEquiptemplateComponent } from './edit-equiptemplate/edit-equiptemplate.component';
import {BsDatepickerModule} from "ngx-bootstrap";



@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    MatExpansionModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    BsDatepickerModule,
    RouterModule.forChild(BoilersRouting)
  ],
  declarations: [
    BoilersComponent,
    BoilerInfoComponent,
    AddBoilerComponent,
    EditBoilerComponent,
    EditAddressComponent,
    EditMaintainComponent,
    TerBindComponent,
    JoinClusterComponent,
    BoilerTemplatesComponent,
    AddEquiptemplateComponent,
    EditEquiptemplateComponent
  ],
  entryComponents: [
    AddBoilerComponent,
    EditBoilerComponent,
    EditAddressComponent,
    EditMaintainComponent,
    TerBindComponent,
    JoinClusterComponent,
    AddEquiptemplateComponent,
    EditEquiptemplateComponent
  ]
})
export class BoilersModule { }
