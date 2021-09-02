import { AboutMeComponent } from './../pages/about-me/about-me.component';
import { SafeHtmlPipe } from './../pipes/safe-html.pipe';
import { ProfileComponent } from './../pages/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './../pages/home/home.component';
import { LoginComponent } from './../components/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    AboutMeComponent,
    SafeHtmlPipe,
  ],
  exports: [
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    AboutMeComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class PagesModule {}
