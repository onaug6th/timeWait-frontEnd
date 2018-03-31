import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomePageModule } from './home-page/home-page.module';

import { SquareModule } from './square/square.module';

import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register/register.service';
import { EqualValidator } from './register/directives/equal-validator.directive';

import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

import { UserSettingModule } from './user-space/user-setting/user-setting.module';

import { UserForgetComponent } from './user-space/user-forget/user-forget.component';

import { ForumModule } from './forum/forum.module';

import { WallModule } from './wall/wall.module';

import { AboutComponent } from './about/about.component';

import { SearchModule } from './search/search.module';

//  timeWait，的路由
import { TimeWaitRoutingModule } from './time-wait-routing.module';

//  404
import { NotFoundModule } from '../common/not-found/not-found.module';

/**
 * 这里做个知识备忘录
 * 新加组件，就要添加到module里
 * 新加路由也一样，添加到module里，或者打到根module里
 * 
 */

@NgModule({
  declarations: [
    RegisterComponent,
    EqualValidator,
    LoginComponent,
    UserForgetComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TimeWaitRoutingModule,
    HomePageModule,
    SquareModule,
    ForumModule,
    UserSettingModule,
    SearchModule,
    WallModule,
    NotFoundModule
  ],
  providers: [
    RegisterService,
    LoginService
  ]
})

export class TimeWaitModule {

}
