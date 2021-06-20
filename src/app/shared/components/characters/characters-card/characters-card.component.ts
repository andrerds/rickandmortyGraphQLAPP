import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICharacter } from '@app/models';
import { LocalStorageService } from '@app/shared/services';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styleUrls: ['./characters-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersCardComponent {
  @Input() character: ICharacter;
  defaultImage = './assets/imgs/rickanmorty.png';
  image = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
  constructor(private localStorageService: LocalStorageService) {}
  toogleFavorite() {
    const isFavorite = this.character.isFavorite;
    this.getIcon();
    this.character.isFavorite = !isFavorite;
    this.localStorageService.addOrRemoveFavorito(this.character);
  }
  getIcon() {
    return this.character.isFavorite ? 'heart-solid.svg' : 'heart.svg';
  }
}
