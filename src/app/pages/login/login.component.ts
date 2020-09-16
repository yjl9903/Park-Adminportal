import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly message: NzMessageService
  ) {
    this.loginForm = this.formBuilder.group({
      username: [
        this.userService.defaultUsername || null,
        [Validators.required],
      ],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i of Object.keys(this.loginForm.controls)) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    const { username, password } = this.loginForm.getRawValue();
    this.userService.login(username, password).subscribe({
      complete: () => {
        this.router.navigate(['home']);
      },
      error: (err) => {
        this.loginForm.get('password').reset();
        if (err.error instanceof ErrorEvent) {
          this.message.error('服务器错误');
        } else {
          const message = err.error?.status;
          if (message.startsWith('Wrong')) {
            this.message.error('密码错误');
          } else {
            this.message.error(`[${err.status}]: ${err.error.status}`);
          }
        }
      },
    });
  }
}
