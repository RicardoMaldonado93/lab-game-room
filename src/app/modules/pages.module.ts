import { SafeHtmlPipe } from './../pipes/safe-html.pipe';
import { ProfileComponent } from './../pages/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './../pages/home/home.component';
import { LoginComponent } from './../components/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoginComponent, HomeComponent, ProfileComponent, SafeHtmlPipe],
  exports: [
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class PagesModule {}
