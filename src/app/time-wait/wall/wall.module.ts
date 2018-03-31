import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WallComponent } from "./wall.component";
import { AppPaginationModule } from '../../common/pagination/pagination.module';

@NgModule({
  declarations: [
    WallComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    AppPaginationModule
  ],
  providers: []
})

export class WallModule {

}
