import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { ComponentsModule } from './modules/components.module';
import { AppRoutingModule } from './routes/app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    ComponentsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
