import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Card, CardService } from '../../../service/card.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ParkService } from '../../../service/park.service';

@Component({
  selector: 'app-create-park',
  templateUrl: './create-park.component.html',
  styleUrls: ['./create-park.component.css'],
})
export class CreateParkComponent {
  createForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly message: NzMessageService,
    private readonly cardService: CardService,
    private readonly parkService: ParkService
  ) {
    this.createForm = formBuilder.group({
      plate: [null, [Validators.required, Validators.maxLength(20)]],
      type: [null, [Validators.maxLength(8)]],
    });
  }

  submitForm(inOut: 'in' | 'out'): void {
    if (!this.createForm.valid) {
      for (const key of Object.keys(this.createForm.controls)) {
        this.createForm.controls[key].markAsDirty();
        this.createForm.controls[key].updateValueAndValidity();
      }
      return;
    }

    const body: Card = this.createForm.getRawValue();
    body.id = null;
    body.name = null;
    body.phone = null;
    body.register = false;
    this.cardService.createCard(body).subscribe({
      complete: () => {
        const parkDto = { plate: body.plate, timestamp: Date.now() };
        const park =
          inOut === 'in'
            ? this.parkService.parkIn(parkDto)
            : this.parkService.parkOut(parkDto);
        park.subscribe({
          complete: () => {
            this.message.success('停车成功');
          },
          error: () => {
            this.message.error('停车失败');
          },
        });
      },
      error: () => {
        this.message.error('停车失败');
      },
    });
  }
}
