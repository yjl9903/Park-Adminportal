import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NzButtonModule,
  NzFormModule,
  NzInputModule,
  NzLayoutModule,
  NzMenuModule,
} from 'ng-zorro-antd';

import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserComponent,
    UserInfoComponent,
    UserListComponent,
    CreateUserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
  ],
})
export class UserModule {}
