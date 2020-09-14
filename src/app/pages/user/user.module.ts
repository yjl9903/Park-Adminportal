import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NzAlertModule,
  NzButtonModule,
  NzDividerModule,
  NzFormModule,
  NzInputModule,
  NzLayoutModule,
  NzMenuModule,
  NzMessageModule,
  NzModalModule,
  NzTableModule,
  NzTagModule,
} from 'ng-zorro-antd';

import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateUserModalComponent } from './update-user-modal/update-user-modal.component';
import { UpdateUserComponent } from './update-user/update-user.component';

@NgModule({
  declarations: [
    UserComponent,
    UserInfoComponent,
    UserListComponent,
    CreateUserComponent,
    UpdateUserModalComponent,
    UpdateUserComponent,
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
    NzTableModule,
    NzTagModule,
    NzMessageModule,
    NzModalModule,
    NzAlertModule,
    NzDividerModule,
  ],
})
export class UserModule {}
