import { MaterialModule } from './../../modules/angular-material.module';
import { MinorMayorComponent } from './minor-mayor/minor-mayor.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'ahorcado',
    component: AhorcadoComponent,
  },
  {
    path: 'minor-or-mayor',
    component: MinorMayorComponent,
  },
];

@NgModule({
  declarations: [MinorMayorComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class GamesModule {}
