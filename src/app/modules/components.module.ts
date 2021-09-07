import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from '../components/footer/footer.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { DialogComponent } from './../components/modal/modal.component';
import { SnackbarComponent } from './../components/snackbar/snackbar.component';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  imports: [CommonModule, BrowserModule, AppRoutingModule],
  declarations: [NavbarComponent, FooterComponent, DialogComponent, SnackbarComponent],
  exports: [NavbarComponent, FooterComponent],
  providers:[SnackbarComponent],
  entryComponents: [DialogComponent],
})
export class ComponentsModule {}
