import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdminSystemLoginComponent } from './adminSystemLogin/adminSystemLogin.component';

import { AdminSystemModule } from './adminSystem/adminSystem.module';

import { AdminRoutingModule } from './admin-routing.module';

import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AdminSystemLoginComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    AdminRoutingModule,
    AdminSystemModule
  ],
  providers:[
    AuthGuard
  ]
})
export class AdminModule { }
