export interface ICharacter {
  id: string;
  idNumber?: number;
  name: string;
  status: string;
  species: string;
  gender: string;

  image: string;
  isFavorite?: boolean;
}
