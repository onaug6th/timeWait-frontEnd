import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BlogComponent } from './blog.component';

import { BlodDefaultModule } from './blog-default/blog-default.module';

import { ArticleDetailModule } from './blog-article-detail/blog-article-detail.module';

import { BlodAboutModule } from './blog-about/blog-about.module';

import { BlogWritePostModule } from './blog-write-post/blog-write-post.module';
import { BlogWritePostService } from './blog-write-post/blog-write-post.service';

import { BlogRoutingModule } from './blog-routing.module';

import { FileUploadAppModule } from '../common/file-upload/file-upload.module';

@NgModule({
  declarations: [
    BlogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BlogRoutingModule,
    BlodDefaultModule,
    ArticleDetailModule,
    BlodAboutModule,
    BlogWritePostModule,
    FileUploadAppModule
  ],
  providers:[
    BlogWritePostService
  ]
})
export class BlogModule { }
