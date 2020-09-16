import { Component, OnDestroy, OnInit } from '@angular/core';
import { ParkInfo, ParkService } from '../../../service/park.service';
import {
  differenceInCalendarDays,
  startOfMonth,
  startOfWeek,
  startOfDay,
  subDays,
  endOfDay,
} from 'date-fns';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

const today = new Date();

const Ranges = {
  今天: [startOfDay(today), today],
  昨天: [startOfDay(subDays(today, 1)), endOfDay(subDays(today, 1))],
  前天: [startOfDay(subDays(today, 2)), endOfDay(subDays(today, 2))],
  本周: [startOfWeek(today), today],
  本月: [startOfMonth(today), today],
};

@Component({
  selector: 'app-park-list',
  templateUrl: './park-list.component.html',
  styleUrls: ['./park-list.component.css'],
})
export class ParkListComponent implements OnInit, OnDestroy {
  ranges = Ranges;

  sub: Subscription;
  parkInfoAll: ParkInfo[] = [];
  parkInfo: ParkInfo[] = [];
  searchValue = '';

  timeFilterFn: (info: ParkInfo) => boolean = () => true;
  plateFilterFn: (info: ParkInfo) => boolean = () => true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly parkService: ParkService
  ) {
    this.sub = parkService.parkInfoSub.subscribe(this.pushFront.bind(this));
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchValue = params.plate;
      if (params.plate) {
        this.plateFilterFn = (info: ParkInfo) => info.plate === params.plate;
      } else {
        this.plateFilterFn = () => true;
      }
      this.pushFront();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  pushFront(info?: ParkInfo): void {
    if (info) {
      this.parkInfoAll.unshift(info);
    }
    this.parkInfo = this.parkInfoAll
      .filter(this.timeFilterFn)
      .filter(this.plateFilterFn);
  }

  disabledDate(current: Date): boolean {
    return differenceInCalendarDays(current, new Date()) > 0;
  }

  handleClose(range: Date[]): void {
    if (range.length === 0) {
      this.timeFilterFn = () => true;
      this.pushFront();
    }
  }

  handleSelectRange(range): void {
    this.timeFilterFn = (info: ParkInfo) => {
      const entry = info.entrytime;
      return range[0] <= entry && entry <= range[1];
    };
    this.pushFront();
  }

  goSearch(plate: string): void {
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { plate },
    });
  }

  goParkInfo(plate: string): void {
    this.goSearch(plate);
  }
}
