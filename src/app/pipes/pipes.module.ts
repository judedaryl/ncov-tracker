import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingPipe } from './loading.pipe';



@NgModule({
  declarations: [
    LoadingPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingPipe
  ]
})
export class PipesModule { }
