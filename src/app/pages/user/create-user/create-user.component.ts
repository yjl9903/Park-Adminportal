import { Component } from '@angular/core';
import { UserService } from '../../../service/user.service';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

const identityRevealedValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const pass = control.get('password');
  const pass2 = control.get('password2');
  return pass &&
    pass2 &&
    pass.value &&
    pass2.value &&
    pass.value !== pass2.value
    ? { identityRevealed: true }
    : null;
};

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  createForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly message: NzMessageService
  ) {
    this.createForm = formBuilder.group(
      {
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
        password2: [null, [Validators.required]],
      },
      { validators: identityRevealedValidator }
    );
  }

  submitForm(): void {
    const { username, password } = this.createForm.getRawValue();
    this.userService.createUser(username, password).subscribe({
      complete: () => {
        this.message.success('添加成功');
        this.createForm.reset();
      },
      error: () => {
        this.message.error('添加失败');
        this.createForm.reset();
      },
    });
  }
}
