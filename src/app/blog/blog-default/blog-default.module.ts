import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BlogDefaultComponent } from "./blog-default.component";

// 文章
import { ArticleComponentModule } from '../../common/article-box/article-box.module';
import { BlogDefaultService } from './blog-default.service';

import { AppPaginationModule } from '../../common/pagination/pagination.module';

@NgModule({
  declarations: [
    BlogDefaultComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ArticleComponentModule,
    AppPaginationModule
  ],
  providers: [
    BlogDefaultService
  ]
})

export class BlodDefaultModule {

}
