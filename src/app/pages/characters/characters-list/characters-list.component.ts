import { Component, OnInit } from '@angular/core';

import { DataService } from '@app/shared/services/data.service';

@Component({
  selector: 'app-characters-list',
  template: `<section class="charecter__list">
    <app-characters-card
      *ngFor="let item of characters$ | async"
      [character]="item"
    ></app-characters-card>
  </section>`,
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {
  characters$ = this.dataService.charecter$;
  constructor(public dataService: DataService) {}

  ngOnInit(): void {}
}
