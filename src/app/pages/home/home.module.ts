import { NgModule } from '@angular/core';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [HomeRoutingModule, NzLayoutModule, NzMenuModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
