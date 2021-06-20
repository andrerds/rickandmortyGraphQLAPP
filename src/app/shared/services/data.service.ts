import { Injectable } from '@angular/core';

import { DataResponse, ICharacter, IEpisodes } from '@app/models';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { find, mergeMap, pluck, take, tap, withLatestFrom } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

const QUERY = gql`
  {
    episodes {
      results {
        id
        name
        episode
      }
    }
    characters {
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private episodesSubject = new BehaviorSubject<IEpisodes[]>([]);
  episodes$ = this.episodesSubject.asObservable();

  private characterSubject = new BehaviorSubject<ICharacter[]>([]);
  character$ = this.characterSubject.asObservable();
  constructor(private apollo: Apollo, private localStorageService: LocalStorageService) {
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
          const mapcharacters = characters.results.map(dados => {
            return {
              idNumber: Number(dados.id),
              ...dados
            };
          });
          const mapepisodes = episodes.results.map(dados => {
            return {
              idNumber: Number(dados.id),
              ...dados
            };
          });
          console.log(mapepisodes);
          this.episodesSubject.next(mapepisodes);
          this.parseCharactersData(mapcharacters);
        })
      )
      .subscribe();
  }

  private parseCharactersData(characters: ICharacter[]): void {
    const currentFavoritos = this.localStorageService.getFavoritesCharacters();
    const newData = characters.map(character => {
      const found = !!currentFavoritos.find((fav: ICharacter) => fav.id === character.id);
      return { ...character, isFavorite: found };
    });
    this.characterSubject.next(newData);
  }

  getCharacterByPage(pageNum: number) {
    const QUERY_BY_PAGE = gql`
      {

        characters(page: ${pageNum}) {
          results {
            id
            name
            status
            species
            gender
            image
          }
        }
      }
    `;

    this.apollo
      .watchQuery<any>({
        query: QUERY_BY_PAGE
      })
      .valueChanges.pipe(
        take(1),
        pluck('data', 'characters'),
        withLatestFrom(this.character$),
        tap(([apiResponse, characters]) => {
          characters.map(res => {
            return {
              id: Number(res.id),
              ...res
            };
          });
          this.parseCharactersData([...characters, ...apiResponse.results]);
        })
      )
      .subscribe();
  }

  getDetails(id): Observable<ICharacter> {
    return this.character$.pipe(
      mergeMap((character: ICharacter[]) => character),
      find((charcater: ICharacter) => charcater?.id === id)
    );
  }
}
