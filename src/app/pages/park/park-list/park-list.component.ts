import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-park-list',
  templateUrl: './park-list.component.html',
  styleUrls: ['./park-list.component.css'],
})
export class ParkListComponent implements OnInit {
  parks: any[] = [];

  constructor() {}

  ngOnInit(): void {}
}
