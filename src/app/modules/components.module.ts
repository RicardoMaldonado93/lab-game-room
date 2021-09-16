import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/modules/angular-material.module';
import { FooterComponent } from '../components/footer/footer.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { DialogComponent } from './../components/modal/modal.component';
import { SpinnerComponent } from './../components/spinner/spinner.component';
@NgModule({
  imports: [CommonModule, BrowserModule, MaterialModule, RouterModule],
  declarations: [NavbarComponent, FooterComponent, DialogComponent, SpinnerComponent] ,
  exports: [NavbarComponent, FooterComponent,SpinnerComponent ],
  providers:[SpinnerComponent],
  entryComponents: [DialogComponent],
})
export class ComponentsModule {}
