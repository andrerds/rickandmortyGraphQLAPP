import { Injectable } from '@angular/core';
import { DataResponse, ICharacter, IEpisodes } from '@app/models';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';

const QUERY = gql`
  {
    episodes {
      results {
        name
        episode
      }
    }
    characters {
      results {
        name
        status
        species
        gender
        origin {
          name
        }
        location {
          name
        }
        image
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private episodesSubject = new BehaviorSubject<IEpisodes[]>(null);
  episodes$ = this.episodesSubject.asObservable();

  private charecterSubject = new BehaviorSubject<ICharacter[]>(null);
  charecter$ = this.charecterSubject.asObservable();
  constructor(private apollo: Apollo) {
    this.getDataAPI();
  }

  private getDataAPI(): void {
    this.apollo
      .watchQuery<DataResponse>({
        query: QUERY
      })
      .valueChanges.pipe(
        take(1),
        tap(({ data }) => {
          const { characters, episodes } = data;
          this.charecterSubject.next(characters.results);
          this.episodesSubject.next(episodes.results);
        })
      )
      .subscribe();
  }
}
