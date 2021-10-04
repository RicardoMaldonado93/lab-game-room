import { ComponentsModule } from './../../modules/components.module';
import { SpinnerComponent } from './../../components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HangmanComponent } from './hangman/hangman.component';
import { MinorMayorComponent } from './minor-mayor/minor-mayor.component';
import { ShooterComponent } from './shooter/shooter.component';

const routes: Routes = [
  {
    path: 'ahorcado',
    component: HangmanComponent,
  },
  {
    path: 'minor-or-mayor',
    component: MinorMayorComponent,
  },
  {
    path: 'shooter',
    component: ShooterComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [
    MinorMayorComponent,
    ShooterComponent,
    HangmanComponent,
  ],
  providers: [],
})
export class GamesModule {}
