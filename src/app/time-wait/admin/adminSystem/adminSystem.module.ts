import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from 'ng2-ckeditor';

import { AdminSystemComponent } from './adminSystem.component';

import { UserManagerComponent } from './user-manager/user-manager.component';
import { BlogManagerComponent } from './blog-manager/blog-manager.component';
import { ForumManagerComponent } from './forum-manager/forum-manager.component';
import { AchievementComponent } from './achievement-manager/achievement-manager.component';

import { AppPaginationModule } from '../../../common/pagination/pagination.module';

@NgModule({
  declarations: [
    AdminSystemComponent,
    UserManagerComponent,
    BlogManagerComponent,
    ForumManagerComponent,
    AchievementComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    AppPaginationModule,
    CKEditorModule
  ]
})
export class AdminSystemModule { }
