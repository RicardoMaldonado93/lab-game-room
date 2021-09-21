import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PipesModule } from './../../modules/pipes.module';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, PipesModule, RouterModule.forChild(routes)],
  exports: [ProfileComponent]
})
export class ProfileModule {}
