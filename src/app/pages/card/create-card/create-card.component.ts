import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Card, CardService } from '../../../service/card.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css'],
})
export class CreateCardComponent {
  createForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly message: NzMessageService,
    private readonly cardService: CardService
  ) {
    this.createForm = formBuilder.group({
      plate: [null, [Validators.required, Validators.maxLength(20)]],
      name: [null, [Validators.required, Validators.maxLength(16)]],
      phone: [null, [Validators.pattern(/^1\d{10}$/)]],
      type: [null, [Validators.required, Validators.maxLength(8)]],
    });
  }

  submitForm(): void {
    const body: Card = this.createForm.getRawValue();
    body.id = null;
    body.register = true;
    this.cardService.createCard(body).subscribe({
      complete: () => {
        this.message.success('注册成功');
      },
      error: () => {
        this.message.error('注册失败');
      },
    });
  }
}
