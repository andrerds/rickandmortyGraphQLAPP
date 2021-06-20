import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICharacter } from '@app/models';
import { DataService } from '@app/shared/services';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-characters-detail',
  templateUrl: './characters-detail.component.html',
  styleUrls: ['./characters-detail.component.scss']
})
export class CharactersDetailComponent implements OnInit {
  charecterID: string | number;
  charecter$: Observable<ICharacter>;
  constructor(private activeRouter: ActivatedRoute, private dataService: DataService) {
    this.activeRouter.params
      .pipe(
        take(1),
        tap(({ id }) => (this.charecter$ = this.dataService.getDetails(id)))
      )
      .subscribe();
  }

  ngOnInit(): void {}

  private getIDRouter() {}
}
