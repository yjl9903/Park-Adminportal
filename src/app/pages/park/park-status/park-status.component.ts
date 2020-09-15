import { Component } from '@angular/core';
import { ParkService, ParkStatus } from '../../../service/park.service';

@Component({
  selector: 'app-park-status',
  templateUrl: './park-status.component.html',
  styleUrls: ['./park-status.component.css'],
})
export class ParkStatusComponent {
  parkStatus: ParkStatus[] = [];

  constructor(private readonly parkService: ParkService) {
    this.parkService.parkStatusSub.subscribe(
      (statuses) => (this.parkStatus = statuses)
    );
  }
}
