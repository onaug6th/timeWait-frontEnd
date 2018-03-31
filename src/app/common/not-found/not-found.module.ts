import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found.component';
@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ]
})
export class NotFoundModule { }
