import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'characters-list',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'episodes',
    loadChildren: () => import('./pages/episodes/episodes.module').then(m => m.EpisodesModule)
  },

  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'characters',
    loadChildren: () =>
      import('./pages/characters/characters/characters.module').then(m => m.CharactersModule)
  },
  {
    path: 'characters-list',
    loadChildren: () =>
      import('./pages/characters/characters-list/characters-list.module').then(
        m => m.CharactersListModule
      )
  },
  {
    path: 'characters-detail/:id',
    loadChildren: () =>
      import('./pages/characters/characters-detail/characters-detail.module').then(
        m => m.CharactersDetailModule
      )
  },
  {
    path: '**',
    loadChildren: () => import('./pages/notFound/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
