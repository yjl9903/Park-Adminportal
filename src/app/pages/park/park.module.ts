import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NzButtonModule,
  NzDatePickerModule,
  NzDividerModule,
  NzDropDownModule,
  NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzLayoutModule,
  NzMenuModule,
  NzMessageModule,
  NzSelectModule,
  NzSpinModule,
  NzStatisticModule,
  NzTableModule,
} from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

import { ParkComponent } from './park.component';
import { ParkRoutingModule } from './park-routing.module';
import { CreateParkComponent } from './create-park/create-park.component';
import { ParkListComponent } from './park-list/park-list.component';
import { ParkStatisticComponent } from './park-statistic/park-statistic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParkStatusComponent } from './park-status/park-status.component';

@NgModule({
  declarations: [
    ParkComponent,
    CreateParkComponent,
    ParkListComponent,
    ParkStatisticComponent,
    ParkStatusComponent,
  ],
  imports: [
    CommonModule,
    ParkRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzSelectModule,
    NzMenuModule,
    NzDividerModule,
    NzStatisticModule,
    NzIconModule,
    NzTableModule,
    NzButtonModule,
    NzDropDownModule,
    NzSpinModule,
    NzMessageModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
  ],
  exports: [ParkComponent],
})
export class ParkModule {}
