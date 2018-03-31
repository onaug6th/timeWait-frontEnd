import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SquareComponent } from "./square.component";

@NgModule({
  declarations: [
    SquareComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: []
})

export class SquareModule {

}
