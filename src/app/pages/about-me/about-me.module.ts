import { Routes, RouterModule } from '@angular/router';
import { AboutMeComponent } from './about-me.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: AboutMeComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
@NgModule({
  declarations: [AboutMeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [AboutMeComponent],
})
export class AboutMeModule {}
