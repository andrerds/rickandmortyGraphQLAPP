import { ICharacter } from './character.model';
import { IEpisodes } from './episodes.model';

export interface APIResponse<T> {
  results: T;
}
export interface DataResponse {
  characters: APIResponse<ICharacter[]>;
  episodes: APIResponse<IEpisodes[]>;
}
