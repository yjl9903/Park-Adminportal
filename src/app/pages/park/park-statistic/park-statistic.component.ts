import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ParkService } from '../../../service/park.service';
import { CardService } from '../../../service/card.service';

@Component({
  selector: 'app-park-statistic',
  templateUrl: './park-statistic.component.html',
  styleUrls: ['./park-statistic.component.css'],
})
export class ParkStatisticComponent implements OnInit, OnDestroy {
  subStatus: Subscription;
  subInfo: Subscription;

  parkStatusNum = 0;
  parkInfoNum = 0;
  cardNum = 0;

  constructor(
    private cardService: CardService,
    private parkService: ParkService
  ) {
    this.cardService.getAllCards().subscribe((cards) => {
      this.cardNum = cards.length;
    });
  }

  ngOnInit(): void {
    this.subStatus = this.parkService.parkStatusSub.subscribe((statuses) => {
      this.parkInfoNum -= this.parkStatusNum;
      this.parkStatusNum = statuses.length;
      this.parkInfoNum += this.parkStatusNum;
    });

    this.subInfo = this.parkService.parkInfoSub.subscribe(() => {
      this.parkInfoNum++;
    });
  }

  ngOnDestroy(): void {
    this.subStatus.unsubscribe();
    this.subInfo.unsubscribe();
  }
}
