import { AboutMeComponent } from './../pages/about-me/about-me.component';
import { ProfileComponent } from './../pages/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../pages/home/home.component';
import { AuthGuard } from './../routes/guards/auth.guard';
import { formsNames } from './../routes/routersNames';
const { LOGIN, HOME, PROFILE, ABOUT_ME } = formsNames;

const appRoutes: Routes = [
  { path: HOME, component: HomeComponent, canActivate: [AuthGuard] },
  { path: PROFILE, component: ProfileComponent, canActivate: [AuthGuard] },
  { path: ABOUT_ME, component: AboutMeComponent, canActivate: [AuthGuard] },
  { path: LOGIN, component: LoginComponent },
  { path: '', redirectTo: `/${LOGIN}`, pathMatch: 'full' },
  { path: '**', redirectTo: `/${LOGIN}` },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
