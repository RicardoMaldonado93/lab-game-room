import { ComponentsModule } from './../../modules/components.module';
import { SpinnerComponent } from './../../components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HangmanComponent } from './hangman/hangman.component';
import { MinorMayorComponent } from './minor-mayor/minor-mayor.component';
import { ShooterComponent } from './shooter/shooter.component';
import { QuizzComponent } from './quizz/quizz.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

const routes: Routes = [
  {
    path: 'hangman',
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
  {
    path: 'quizz',
    component: QuizzComponent,
  },
];

@NgModule({
  imports: [
    NgxSkeletonLoaderModule,
    CommonModule, RouterModule.forChild(routes)],
  declarations: [
    MinorMayorComponent,
    ShooterComponent,
    HangmanComponent,
    QuizzComponent,
  ],
  providers: [],
})
export class GamesModule {}
