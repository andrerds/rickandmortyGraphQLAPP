import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Component, HostListener, OnInit } from '@angular/core';
import { LocalStorageService } from '@app/shared/services';
import { DataService } from '@app/shared/services/data.service';

@Component({
  selector: 'app-characters-list',
  template: `<section class="charecter__list" infiniteScroll (scrolled)="onScrollDown()">
      <app-characters-card
        *ngFor="let item of characters$ | async"
        [character]="item"
      ></app-characters-card>
    </section>
    <button *ngIf="showBottom" class="button" (click)="onScrollTop()">UP</button> `,
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {
  characters$ = this.dataService.character$;
  showBottom = false;
  private pageNum = 1;
  private scrollHeight = 500;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    public dataService: DataService,
    private localStorageService: LocalStorageService
  ) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    const yOffSet = window.pageXOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showBottom = (yOffSet || scrollTop) > this.scrollHeight;
  }
  ngOnInit(): void {}

  onScrollTop() {
    this.document.documentElement.scrollTop = 0;
  }

  onScrollDown() {
    this.pageNum++;
    this.dataService.getCharacterByPage(this.pageNum);
  }
}
