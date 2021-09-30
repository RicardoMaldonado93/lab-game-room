import { MaterialModule } from './../../modules/angular-material.module';
import { MinorMayorComponent } from './minor-mayor/minor-mayor.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
