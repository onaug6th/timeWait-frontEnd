import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from 'ng2-ckeditor';

import { UserSpaceLayoutComponent } from './user-space-layout.component';

import { UserSpaceDefaultComponent } from './user-space-default/user-space-default.component';
import { UserSpaceApplicationComponent } from './user-space-application/user-space-application.componenet';
import { BlogSettingComponent } from './user-space-default/blog-setting/blog-setting.component';
import { ForumSettingComponent } from './user-space-default/forum-setting/forum-setting.component';
import { AppPaginationModule } from '../../../common/pagination/pagination.module';

@NgModule({
  declarations: [
    UserSpaceLayoutComponent,
    UserSpaceDefaultComponent,
    UserSpaceApplicationComponent,
    BlogSettingComponent,
    ForumSettingComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    CKEditorModule,
    AppPaginationModule
  ]
})
export class UserSpaceLayoutModule { }
