import { MaterialModule } from 'src/app/modules/angular-material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from '../components/footer/footer.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { DialogComponent } from './../components/modal/modal.component';
import { SpinnerComponent } from './../components/spinner/spinner.component';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  imports: [CommonModule, BrowserModule, AppRoutingModule, MaterialModule],
  declarations: [NavbarComponent, FooterComponent, DialogComponent, SpinnerComponent] ,
  exports: [NavbarComponent, FooterComponent,SpinnerComponent ],
  providers:[SpinnerComponent],
  entryComponents: [DialogComponent],
})
export class ComponentsModule {}
