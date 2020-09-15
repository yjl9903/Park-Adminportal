import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  concat,
  from,
  interval,
  Observable,
  ReplaySubject,
} from 'rxjs';
import { filter, mergeMap, retry } from 'rxjs/operators';

export interface ParkDto {
  plate: string;
  timestamp: number;
}

export interface ParkStatus {
  id: number;
  plate: string;
  timestamp: number;
}

export interface ParkInfo {
  id: number;
  plate: string;
  entrytime: number;
  departuretime: number;
  fee: number;
}

@Injectable({
  providedIn: 'root',
})
export class ParkService {
  static parkUrl = '/information';
  static allParkStatusUrl = '/status';
  static allParkInfoUrl = '/information';

  parkStatusSub: BehaviorSubject<ParkStatus[]>;
  parkInfoSub: ReplaySubject<ParkInfo>;

  constructor(private readonly httpClient: HttpClient) {
    const intervalTime = 2000;

    this.parkStatusSub = new BehaviorSubject<ParkStatus[]>([]);
    const parkStatusObs = concat(
      this.httpClient
        .get<ParkStatus[]>(ParkService.allParkStatusUrl)
        .pipe(retry()),
      interval(intervalTime).pipe(
        mergeMap(() =>
          this.httpClient.get<ParkStatus[]>(ParkService.allParkStatusUrl)
        ),
        retry()
      )
    );

    parkStatusObs.subscribe((statuses: ParkStatus[]) => {
      this.parkStatusSub.next(statuses);
    });

    this.parkInfoSub = new ReplaySubject<ParkInfo>(Number.MAX_SAFE_INTEGER);
    const parkInfoSet = new Set<number>();
    const parkInfoObs = concat(
      this.httpClient.get<ParkInfo[]>(ParkService.allParkInfoUrl),
      interval(intervalTime).pipe(
        mergeMap(() =>
          this.httpClient.get<ParkInfo[]>(ParkService.allParkInfoUrl)
        )
      ),
      retry()
    ).pipe(
      mergeMap((infos: ParkInfo[]) => {
        return from(infos);
      }),
      filter((info: ParkInfo) => {
        if (!parkInfoSet.has(info.id)) {
          parkInfoSet.add(info.id);
          return true;
        } else {
          return false;
        }
      })
    );

    parkInfoObs.subscribe((info) => {
      this.parkInfoSub.next(info);
    });
  }

  parkIn(parkDto: ParkDto): Observable<ParkStatus> {
    return this.httpClient.post<ParkStatus>(ParkService.parkUrl, parkDto);
  }

  parkOut(parkDto: ParkDto): Observable<ParkStatus> {
    return this.httpClient.request<ParkStatus>('DELETE', ParkService.parkUrl, {
      body: parkDto,
    });
  }
}
