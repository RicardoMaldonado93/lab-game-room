import { LoginComponent } from './../components/login/login.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from '../components/footer/footer.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { DialogComponent } from './../components/modal/modal.component';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  imports: [CommonModule, BrowserModule, AppRoutingModule],
  declarations: [NavbarComponent, FooterComponent, DialogComponent],
  exports: [NavbarComponent, FooterComponent],
  entryComponents: [DialogComponent],
})
export class ComponentsModule {}
