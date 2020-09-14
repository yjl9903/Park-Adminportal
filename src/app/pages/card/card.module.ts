import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDividerModule, NzLayoutModule, NzMenuModule } from 'ng-zorro-antd';

import { CardComponent } from './card.component';
import { CardRoutingModule } from './card-routing.module';
import { CreateCardComponent } from './create-card/create-card.component';
import { CardListComponent } from './card-list/card-list.component';

@NgModule({
  declarations: [CardComponent, CreateCardComponent, CardListComponent],
  imports: [
    CommonModule,
    CardRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzDividerModule,
  ],
})
export class CardModule {}
