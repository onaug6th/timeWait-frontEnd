import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';       //  表单验证需要依赖(双向绑定)
import { ReactiveFormsModule } from '@angular/forms'; //  表单验证需要依赖（动态表单）

import { HttpModule, JsonpModule, Http } from '@angular/http';  //  http服务依赖


import { CKEditorModule } from 'ng2-ckeditor';

//  根
import { AppComponent } from './app.component';

//  404
import { NotFoundModule } from './common/not-found/not-found.module';

// 顶部导航栏
import { TopNavComponent } from './common/top-nav/top-nav.component';

// 登陆框
import { LoginModalComponent } from './common/login-modal/login-modal.component';

//  小助手
import { SmallZhuHandComponent } from './common/small-zhu-hand/small-zhu-hand.component';

// 全局路由
import { AppRoutingModule } from './app-routing.module';

// 通用服务
import { HttpClientService } from './services/http-client.service'; //  http客户端
import { loginModalAPPService } from './common/login-modal/login-modal.service'; //  登陆服务
import { CommonService } from './services/common.service';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    LoginModalComponent,
    SmallZhuHandComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    NotFoundModule,
    CKEditorModule
  ],
  providers: [
    HttpClientService,
    loginModalAPPService,
    CommonService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
