import { Component } from '@angular/core';
import { Card, CardService } from '../../../service/card.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent {
  cards: Card[] = [];
  loading = true;

  registerFilterItems = [
    { text: '正式卡', value: true },
    { text: '临时卡', value: false },
  ];

  registerFilterFn(list: boolean[], card: Card): boolean {
    return list.some((value) => value === card.register);
  }

  constructor(
    private readonly router: Router,
    private readonly cardService: CardService
  ) {
    cardService.getAllCards().subscribe((cards: Card[]) => {
      this.cards = cards;
      this.loading = false;
    });
  }

  goParkInfo(plate: string): void {
    this.router.navigate(['/', 'home', 'park', 'list'], {
      queryParams: { plate },
    });
  }
}
