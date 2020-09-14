import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Card {
  id: number;
  plate: string;
  name: string;
  phone: string;
  type: string;
  register: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CardService {
  static createUrl = 'card';
  static allCardsUrl = 'card';

  constructor(private readonly httpClient: HttpClient) {}

  createCard(body: Card): Observable<Card> {
    return this.httpClient.post<Card>(CardService.createUrl, body);
  }

  getAllCards(): Observable<Card[]> {
    return this.httpClient.get<Card[]>(CardService.allCardsUrl);
  }
}
