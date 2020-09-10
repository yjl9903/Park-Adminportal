import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule, NzMenuModule } from 'ng-zorro-antd';

import { CardComponent } from './card.component';
import { CardRoutingModule } from './card-routing.module';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, CardRoutingModule, NzLayoutModule, NzMenuModule],
})
export class CardModule {}
