import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = this.formBuilder.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

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
      error: () => {
        this.loginForm.reset();
      },
    });
  }
}
