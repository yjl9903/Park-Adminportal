import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule, NzMenuModule } from 'ng-zorro-antd';

import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, UserRoutingModule, NzLayoutModule, NzMenuModule],
})
export class UserModule {}
