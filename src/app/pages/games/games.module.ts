import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MinorMayorComponent } from './minor-mayor/minor-mayor.component';
import { ShooterComponent } from './shooter/shooter.component';

const routes: Routes = [
  {
    path: 'ahorcado',
    component: AhorcadoComponent,
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
  declarations: [MinorMayorComponent, ShooterComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class GamesModule {}
