import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersListRoutingModule } from './characters-list-routing.module';
import { CharactersListComponent } from './characters-list.component';
import { CharactersCardComponent } from '@app/shared';
import { CharactersCardModule } from '@app/shared/components/characters/characters-card/characters-card.module';

@NgModule({
  declarations: [CharactersListComponent],
  imports: [CommonModule, CharactersCardModule, CharactersListRoutingModule]
})
export class CharactersListModule {}
