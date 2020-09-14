import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ParkDto {
  plate: string;
  type?: string;
  timestamp: number;
}

export interface Park {
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
  static parkInUrl = '/information';
  static parkOutUrl = '/park';

  constructor(private readonly httpClient: HttpClient) {}

  parkIn(parkDto: ParkDto): Observable<Park> {
    return this.httpClient.post<Park>(ParkService.parkInUrl, parkDto);
  }

  parkOut(parkDto: ParkDto): Observable<Park> {
    return this.httpClient.post<Park>(ParkService.parkOutUrl, parkDto);
  }
}
