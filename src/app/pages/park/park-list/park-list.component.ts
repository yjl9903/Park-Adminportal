import { Component } from '@angular/core';
import { ParkInfo, ParkService } from '../../../service/park.service';
import {
  differenceInCalendarDays,
  startOfMonth,
  startOfWeek,
  startOfDay,
  subDays,
  endOfDay,
} from 'date-fns';

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
export class ParkListComponent {
  ranges = Ranges;

  parkInfoAll: ParkInfo[] = [];
  parkInfo: ParkInfo[] = [];
  filterFn: (info: ParkInfo) => boolean = () => true;

  constructor(private readonly parkService: ParkService) {
    parkService.parkInfoSub.subscribe((info) => {
      this.pushFront(info);
    });
  }

  pushFront(info?: ParkInfo): void {
    if (info) {
      this.parkInfoAll.unshift(info);
      this.parkInfo = this.parkInfoAll.filter(this.filterFn);
    } else {
      this.parkInfo = this.parkInfoAll.filter(this.filterFn);
    }
  }

  disabledDate(current: Date): boolean {
    return differenceInCalendarDays(current, new Date()) > 0;
  }

  handleClose(range: Date[]): void {
    if (range.length === 0) {
      this.filterFn = () => true;
      this.pushFront();
    }
  }

  handleSelectRange(range): void {
    this.filterFn = (info: ParkInfo) => {
      const entry = info.entrytime;
      return range[0] <= entry && entry <= range[1];
    };
    this.pushFront();
  }
}
