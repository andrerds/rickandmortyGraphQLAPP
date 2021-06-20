import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICharacter } from '@app/models';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styleUrls: ['./characters-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersCardComponent {
  @Input() character: ICharacter;
  toogleFavorite() {
    const isFavorite = this.character.isFavorite;
    this.getIcon();
    this.character.isFavorite = isFavorite;
  }
  getIcon() {
    return this.character.isFavorite ? 'heart-solid.svg' : 'heart.svg';
  }
}
