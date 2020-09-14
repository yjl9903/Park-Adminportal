import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concat, from, interval, Observable, ReplaySubject } from 'rxjs';
import { filter, map, mergeMap, retry } from 'rxjs/operators';

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

  parkStatus: ParkStatus[] = [];
  parkStatusObs: Observable<ParkStatus[]>;

  parkInfo: ParkInfo[] = [];
  parkInfoSub: ReplaySubject<ParkInfo>;
  parkInfoObs: Observable<ParkInfo>;

  constructor(private readonly httpClient: HttpClient) {
    const intervalTime = 2000;

    this.parkStatusObs = concat(
      this.httpClient
        .get<ParkStatus[]>(ParkService.allParkStatusUrl)
        .pipe(retry()),
      interval(intervalTime).pipe(
        mergeMap(() =>
          this.httpClient.get<ParkStatus[]>(ParkService.allParkStatusUrl)
        ),
        retry()
      )
    ).pipe(
      map((statuses: ParkStatus[]) => {
        this.parkStatus = statuses;
        return statuses;
      })
    );

    this.parkInfoSub = new ReplaySubject<ParkInfo>(Number.MAX_SAFE_INTEGER);
    const parkInfoSet = new Set<number>();
    this.parkInfoObs = concat(
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
          this.parkInfoSub.next(info);
          return true;
        } else {
          return false;
        }
      })
    );

    this.parkInfoSub.subscribe((info: ParkInfo) => this.parkInfo.unshift(info));
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
