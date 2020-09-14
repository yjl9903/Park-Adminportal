import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDividerModule, NzLayoutModule, NzMenuModule } from 'ng-zorro-antd';

import { ParkComponent } from './park.component';
import { ParkRoutingModule } from './park-routing.module';
import { CreateParkComponent } from './create-park/create-park.component';
import { ParkListComponent } from './park-list/park-list.component';

@NgModule({
  declarations: [ParkComponent, CreateParkComponent, ParkListComponent],
  imports: [
    CommonModule,
    ParkRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzDividerModule,
  ],
  exports: [ParkComponent],
})
export class ParkModule {}
