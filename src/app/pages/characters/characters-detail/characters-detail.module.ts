import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersDetailRoutingModule } from './characters-detail-routing.module';
import { CharactersDetailComponent } from './characters-detail.component';
import { CharactersCardModule } from '@app/shared/components';

@NgModule({
  declarations: [CharactersDetailComponent],
  imports: [CommonModule, CharactersCardModule, CharactersDetailRoutingModule]
})
export class CharactersDetailModule {}
