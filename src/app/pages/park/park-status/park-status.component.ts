import { Component, OnInit } from '@angular/core';
import { ParkService, ParkStatus } from '../../../service/park.service';

@Component({
  selector: 'app-park-status',
  templateUrl: './park-status.component.html',
  styleUrls: ['./park-status.component.css'],
})
export class ParkStatusComponent {
  parkStatus: ParkStatus[] = [];

  constructor(private readonly parkService: ParkService) {
    this.parkStatus = parkService.parkStatus;
    this.parkService.parkStatusObs.subscribe(
      (statuses) =>
        (this.parkStatus = statuses.sort((a, b) => b.timestamp - a.timestamp))
    );
  }
}
