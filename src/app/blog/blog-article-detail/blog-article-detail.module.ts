import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from 'ng2-ckeditor';

import { BlogArticleDetailService } from './blog-article-detail.service';
import { ArticleDetailComponent } from "./blog-article-detail.component";

import { AppPaginationModule } from '../../common/pagination/pagination.module';
import { EscapeHtmlModule } from '../../common/directive/domSanitizer/domSanitizer.module';
@NgModule({
  declarations: [
    ArticleDetailComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    AppPaginationModule,
    CKEditorModule,
    EscapeHtmlModule
  ],
  providers: [
    BlogArticleDetailService
  ]
})

export class ArticleDetailModule {

}
