import { AuthGuard } from './../../routes/guards/auth.guard';
import { formsNames } from './../../routes/routersNames';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivateChild:[AuthGuard]
  },
  
];
@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [HomeComponent],
})
export class HomeModule {}
