import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkComponent } from './park.component';
import { ParkRoutingModule } from './park-routing.module';

@NgModule({
  declarations: [ParkComponent],
  imports: [CommonModule, ParkRoutingModule],
})
export class ParkModule {}
