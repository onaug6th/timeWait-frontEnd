import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CKEditorModule } from 'ng2-ckeditor';

import { BlogWritePostComponent } from "./blog-write-post.component";

@NgModule({
  declarations: [
    BlogWritePostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule
  ],
  providers: []
})

export class BlogWritePostModule {

}
