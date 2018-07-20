import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClusterListComponent } from './cluster-list/cluster-list.component';
import {ClusterRoutingModule} from './cluster-routing.module';
import {RouterModule} from '@angular/router';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {NgZorroAntdModule} from "ng-zorro-antd";
import { ClusterDetailComponent } from './cluster-detail/cluster-detail.component';
import { AddClusterComponent } from './add-cluster/add-cluster.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    NgZorroAntdModule,
    RouterModule.forChild(ClusterRoutingModule)
  ],
  declarations: [
    ClusterListComponent,
    ClusterDetailComponent,
    AddClusterComponent
  ],
  entryComponents: [
    AddClusterComponent
  ]
})
export class ClusterModule { }
