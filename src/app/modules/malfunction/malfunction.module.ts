import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {NgxEchartsModule} from 'ngx-echarts';
import {MalfunctionRoutingModule} from './malfunction-routing.module';
import { MalCurrentComponent } from './mal-current/mal-current.component';
import { MalHistoryComponent } from './mal-history/mal-history.component';
import { MalDetailComponent } from './mal-detail/mal-detail.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    NgZorroAntdModule,
    NgxEchartsModule,
    RouterModule.forChild(MalfunctionRoutingModule)
  ],
  declarations: [
  MalCurrentComponent,
  MalHistoryComponent,
  MalDetailComponent],
  entryComponents: [

  ],
  exports: [

  ]
})
export class MalfunctionModule { }
