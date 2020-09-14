import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordRevealedValidator } from '../create-user/create-user.component';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-update-user-modal',
  templateUrl: './update-user-modal.component.html',
  styleUrls: ['./update-user-modal.component.css'],
})
export class UpdateUserModalComponent {
  @Input() username: string;

  updateForm: FormGroup = this.formBuilder.group(
    {
      password: [null, [Validators.required]],
      password2: [null, [Validators.required]],
    },
    { validators: PasswordRevealedValidator }
  );

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly modal: NzModalRef
  ) {}

  close(): void {
    this.modal.destroy();
  }
}
