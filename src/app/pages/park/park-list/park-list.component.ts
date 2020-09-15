import { Component, OnInit } from '@angular/core';
import { ParkInfo, ParkService } from '../../../service/park.service';

@Component({
  selector: 'app-park-list',
  templateUrl: './park-list.component.html',
  styleUrls: ['./park-list.component.css'],
})
export class ParkListComponent implements OnInit {
  parkInfo: ParkInfo[] = [];

  constructor(private readonly parkService: ParkService) {
    parkService.parkInfoSub.subscribe((info) => {
      this.parkInfo = [info, ...this.parkInfo];
    });
  }

  ngOnInit(): void {}
}
