import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CKEditorModule } from 'ng2-ckeditor';

import { ForumComponent } from './forum.component';

import { ForumNewPostComponent } from './forum-new-post/forum-new-post.component';

import { ForumPostDetailComponent } from './forum-post-detail/forum-post-detail.component';

import { ForumService } from './forum.service';
import { EscapeHtmlModule } from '../../common/directive/domSanitizer/domSanitizer.module';
import { AppPaginationModule } from '../../common/pagination/pagination.module';

@NgModule({
  declarations: [
    ForumComponent,
    ForumNewPostComponent,
    ForumPostDetailComponent
  ],
  imports: [
    RouterModule,
    CKEditorModule,
    FormsModule,
    CommonModule,
    EscapeHtmlModule,
    AppPaginationModule
  ],
  providers: [
    ForumService
  ]
})
export class ForumModule { }
