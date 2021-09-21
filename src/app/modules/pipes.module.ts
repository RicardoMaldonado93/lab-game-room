import { SafeHtmlPipe } from './../pipes/safe-html.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [SafeHtmlPipe],
  imports: [
    CommonModule
  ],
  exports:[SafeHtmlPipe]
})
export class PipesModule { }
