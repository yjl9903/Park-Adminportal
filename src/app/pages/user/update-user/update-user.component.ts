import { Component, Input, ViewContainerRef } from '@angular/core';
import { UpdateUserModalComponent } from '../update-user-modal/update-user-modal.component';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent {
  @Input() username: string;
  @Input() nzSize = 'default';

  constructor(
    private readonly userService: UserService,
    private readonly message: NzMessageService,
    private readonly modal: NzModalService,
    private readonly viewContainerRef: ViewContainerRef
  ) {}

  updateInfo(): void {
    this.modal.create({
      nzTitle: '修改密码',
      nzContent: UpdateUserModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzGetContainer: () => document.body,
      nzComponentParams: {
        username: this.username,
      },
      nzFooter: [
        {
          label: '提交',
          type: 'primary',
          onClick: (componentInstance) => {
            if (componentInstance) {
              const { updateForm } = componentInstance;
              for (const key of Object.keys(updateForm.controls)) {
                updateForm.controls[key].markAsDirty();
                updateForm.controls[key].updateValueAndValidity();
              }
              if (updateForm.valid) {
                this.userService
                  .updateUser(this.username, updateForm.getRawValue().password)
                  .subscribe({
                    complete: () => {
                      this.message.success('修改成功');
                      componentInstance.close();
                    },
                    error: () => {
                      updateForm.reset();
                      this.message.error('修改失败');
                    },
                  });
              }
            } else {
              componentInstance.close();
            }
          },
        },
      ],
    });
  }
}
