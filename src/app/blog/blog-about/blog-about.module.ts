import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { EscapeHtmlModule } from '../../common/directive/domSanitizer/domSanitizer.module';

import { BlogAboutComponent } from "./blog-about.component";

@NgModule({
  declarations: [
    BlogAboutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule,
    EscapeHtmlModule
  ],
  providers: []
})

export class BlodAboutModule {

}
