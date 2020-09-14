import { Component } from '@angular/core';
import { Card, CardService } from '../../../service/card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent {
  cards: Card[] = [];
  loading = true;

  constructor(private readonly cardService: CardService) {
    cardService.getAllCards().subscribe((cards: Card[]) => {
      this.cards = cards;
      this.loading = false;
    });
  }
}
