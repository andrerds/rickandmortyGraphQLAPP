import { Injectable } from '@angular/core';
import { ICharacter } from '@app/models';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
const MY_FAVORITES_RIKC = 'my_favorites_rick';
@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private charactersFavSubject = new BehaviorSubject<ICharacter[]>(null);
  charactersFavSubject$ = this.charactersFavSubject.asObservable();
  constructor(private toastService: ToastrService) {
    this.initalStorage();
  }

  addOrRemoveFavorito(charecter: ICharacter) {
    debugger;
    const { idNumber } = charecter;

    const currentsFavoritos = this.getFavoritesCharacters();
    const found = !!currentsFavoritos.find((fav: ICharacter) => {
      fav.idNumber === idNumber;
    });
    found ? this.removeFavorito(Number(idNumber)) : this.addFavorito(charecter);
  }
  private addFavorito(charecter: ICharacter) {
    try {
      const currentsFavoritos = this.getFavoritesCharacters();
      localStorage.setItem(MY_FAVORITES_RIKC, JSON.stringify([...currentsFavoritos, charecter]));
      this.charactersFavSubject.next([...currentsFavoritos, charecter]);
      this.toastService.success(`${charecter.name} adicionado aos favoritos`, 'RickAndMortyApp');
    } catch (error) {
      console.log('Erro salve Favorites storage', error);
      this.toastService.error(`Erro remover loscalstorage ${error}`, 'RickAndMortyApp');
      alert('Error ' + error);
    }
  }

  private removeFavorito(id) {
    try {
      const currentsFavoritos = this.getFavoritesCharacters();
      const charecters = currentsFavoritos.filter(item => Number(item.id) !== Number(id));
      localStorage.setItem(MY_FAVORITES_RIKC, JSON.stringify([...charecters]));
      this.charactersFavSubject.next([...charecters]);
      this.toastService.warning(`${charecters.name} removido dos favoritos`, 'RickAndMortyApp');
    } catch (error) {
      this.toastService.error(`Erro remover loscalstorage ${error}`, 'RickAndMortyApp');
      console.log('Erro Remver Favorites storage', error);
      alert('Error ' + error);
    }
  }
  getFavoritesCharacters() {
    try {
      const getLocalStorage = localStorage.getItem(MY_FAVORITES_RIKC);
      const charactersFavoritos = JSON.parse(getLocalStorage);
      this.charactersFavSubject.next(charactersFavoritos);
      return charactersFavoritos;
    } catch (error) {
      console.log('Erro getting Favorites storage', error);
    }
  }

  clerarStorage(): void {
    try {
      const clearLocalStorage = localStorage.removeItem(MY_FAVORITES_RIKC);
      return clearLocalStorage;
    } catch (error) {
      console.log('Erro clear Favorites storage', error);
    }
  }
  private initalStorage(): void {
    const currensts = JSON.parse(localStorage.getItem(MY_FAVORITES_RIKC));
    if (!currensts) {
      localStorage.setItem(MY_FAVORITES_RIKC, JSON.stringify([]));
    }
    this.getFavoritesCharacters();
  }
}
