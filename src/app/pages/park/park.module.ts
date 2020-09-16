import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NzButtonModule,
  NzDatePickerModule,
  NzDividerModule,
  NzDropDownModule,
  NzFormModule,
  NzGridModule,
  NzInputModule,
  NzLayoutModule,
  NzMenuModule,
  NzMessageModule,
  NzSelectModule,
  NzStatisticModule,
  NzTableModule,
} from 'ng-zorro-antd';

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
    NzTableModule,
    NzButtonModule,
    NzDropDownModule,
    NzMessageModule,
  ],
  exports: [ParkComponent],
})
export class ParkModule {}
