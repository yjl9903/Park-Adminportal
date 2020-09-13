import { Component } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  createForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService
  ) {
    this.createForm = formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {}
}
