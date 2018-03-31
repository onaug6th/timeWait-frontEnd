import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserSpaceComponent } from './user-space.component';
import { UserSpaceLayoutModule } from './user-space-layout/user-space-layout.module';

import { UserSpaceRoutingModule } from './user-space-routing.module';

import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    UserSpaceComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    UserSpaceRoutingModule,
    UserSpaceLayoutModule
  ],
  providers: [
    AuthGuard
  ]
})
export class UserSpaceModule { }
