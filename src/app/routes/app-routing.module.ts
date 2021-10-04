import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { formsNames } from './routersNames';

const { LOGIN, HOME, PROFILE, ABOUT_ME, GAMES, SCORES } = formsNames;

const appRoutes: Routes = [
  {
    path: LOGIN,
    loadChildren: () =>
      import('../pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: HOME,
    loadChildren: () =>
      import('../pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: PROFILE,
    loadChildren: () =>
      import('../pages/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: ABOUT_ME,
    loadChildren: () =>
      import('../pages/about-me/about-me.module').then((m) => m.AboutMeModule),
    canActivate: [AuthGuard],
  },
  {
    path: GAMES,
    loadChildren: () =>
      import('../pages/games/games.module').then((m) => m.GamesModule),
    canActivate: [AuthGuard],
  },
  {
    path: SCORES,
    loadChildren: () =>
      import('../pages/scores/scores.module').then((m) => m.ScoresModule),
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: `${HOME}`, pathMatch: 'full' },
  { path: '**', redirectTo: `${HOME}` },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
