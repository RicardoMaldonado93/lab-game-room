import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MaterialModule } from 'src/app/modules/angular-material.module';
import { FooterComponent } from '../components/footer/footer.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ChatComponent } from './../components/chat/chat.component';
import { DialogComponent } from './../components/modal/modal.component';
import { SpinnerComponent } from './../components/spinner/spinner.component';
import { SurveyComponent } from './../components/survey/survey.component';
import { PipesModule } from './pipes.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    NgbModule,
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
    DialogComponent,
    SpinnerComponent,
    ChatComponent,
    SurveyComponent,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    SpinnerComponent,
    ChatComponent,
    SurveyComponent,
  ],
  providers: [SpinnerComponent, SurveyComponent],
  entryComponents: [DialogComponent],
})
export class ComponentsModule {}
