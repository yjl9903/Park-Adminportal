import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css'],
})
export class CreateCardComponent {
  createForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.createForm = formBuilder.group({
      car: [null, [Validators.required]],
      name: [null, [Validators.required]],
      phone: [null, [Validators.pattern(/^1\d{10}$/)]],
    });
  }

  submitForm(): void {}
}
