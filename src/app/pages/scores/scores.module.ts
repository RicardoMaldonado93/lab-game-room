import { RouterModule, Routes } from '@angular/router';
import { ScoresComponent } from './scores.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: '',
    component: ScoresComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
@NgModule({
  declarations: [ScoresComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[ScoresComponent]
})
export class ScoresModule { }
