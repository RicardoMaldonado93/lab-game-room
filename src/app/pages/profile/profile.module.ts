import { Routes, RouterModule } from '@angular/router';
import { SafeHtmlPipe } from './../../pipes/safe-html.pipe';
import { ProfileComponent } from './profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  declarations: [ProfileComponent,SafeHtmlPipe],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [ProfileComponent],
})
export class ProfileModule {}
