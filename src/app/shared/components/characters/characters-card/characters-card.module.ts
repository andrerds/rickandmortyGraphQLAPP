import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersCardComponent } from './characters-card.component';
import { RouterModule } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [CharactersCardComponent],
  imports: [CommonModule, RouterModule, LazyLoadImageModule],
  exports: [CharactersCardComponent]
})
export class CharactersCardModule {}
