import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule, NzMenuModule } from 'ng-zorro-antd';

import { ParkComponent } from './park.component';
import { ParkRoutingModule } from './park-routing.module';
import { CreateParkComponent } from './create-park/create-park.component';

@NgModule({
  declarations: [ParkComponent, CreateParkComponent],
  imports: [CommonModule, NzLayoutModule, NzMenuModule, ParkRoutingModule],
  exports: [ParkComponent],
})
export class ParkModule {}
