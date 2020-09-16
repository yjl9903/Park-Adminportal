import { Component, OnDestroy, OnInit } from '@angular/core';
import { merge, Subscription } from 'rxjs';
import { EChartOption } from 'echarts';
import {
  endOfHour,
  format,
  getTime,
  startOfDay,
  startOfHour,
  subHours,
} from 'date-fns';
import { debounceTime } from 'rxjs/operators';

import {
  ParkInfo,
  ParkService,
  ParkStatus,
} from '../../../service/park.service';
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

  parkStatus: ParkStatus[] = [];
  parkInfo: ParkInfo[] = [];
  type: 'day' | 'week' = 'day';
  options: EChartOption;

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
      this.parkStatus = statuses;
      this.parkInfoNum -= this.parkStatusNum;
      this.parkStatusNum = statuses.length;
      this.parkInfoNum += this.parkStatusNum;
    });

    this.subInfo = this.parkService.parkInfoSub.subscribe((info) => {
      this.parkInfo.push(info);
      this.parkInfoNum++;
    });

    merge(this.parkService.parkStatusSub, this.parkService.parkInfoSub)
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.renderChart();
      });
  }

  splitTime(): Date[][] {
    const result: Date[][] = [];
    if (this.type === 'day') {
      const today = startOfHour(new Date());
      for (let i = 23; i >= 0; i--) {
        const L = subHours(today, i);
        const R = endOfHour(L);
        result.push([L, R]);
      }
    } else if (this.type === 'week') {
      const today = startOfDay(new Date());
      for (let i = 23; i >= 0; i--) {
        const L = subHours(today, i);
        const R = endOfHour(L);
        result.push([L, R]);
      }
    }
    return result;
  }

  renderChart(): void {
    const dimensions = ['date', '进入', '离开'];
    const split = this.splitTime();
    const source = split.map((date) => ({
      date: format(date[0], 'HH'),
      进入: 0,
      离开: 0,
    }));

    const parkInfoSet = new Set<number>();

    for (const info of this.parkInfo) {
      const { entrytime, departuretime, id } = info;
      parkInfoSet.add(id);
      for (let i = 0; i < split.length; i++) {
        const [L, R] = split[i];
        if (getTime(L) <= entrytime && entrytime <= getTime(R)) {
          source[i].进入++;
        }
        if (getTime(L) <= departuretime && departuretime <= getTime(R)) {
          source[i].离开++;
        }
      }
    }

    for (const status of this.parkStatus) {
      const { timestamp, id } = status;
      if (!parkInfoSet.has(id)) {
        for (let i = 0; i < split.length; i++) {
          const [L, R] = split[i];
          if (getTime(L) <= timestamp && timestamp <= getTime(R)) {
            source[i].进入++;
          }
        }
      }
    }

    this.options = {
      legend: {},
      tooltip: {},
      dataset: {
        dimensions,
        source,
      },
      xAxis: { type: 'category', name: '小时' },
      yAxis: { name: '车辆数' },
      color: ['#69c0ff', '#ff7875', '#95de64', '#ff85c0'],
      series: [{ type: 'custom' }, { type: 'bar' }, { type: 'bar' }],
    };
  }

  ngOnDestroy(): void {
    this.subStatus.unsubscribe();
    this.subInfo.unsubscribe();
  }
}
