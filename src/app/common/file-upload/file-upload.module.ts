import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FileUploadModule } from 'ng2-file-upload';

import { FileUploadComponent } from './file-upload.component';

/**
 * 这里做个知识备忘录
 * 新加组件，就要添加到module里
 * 新加路由也一样，添加到module里，或者打到根module里
 * 
 */

@NgModule({
  declarations: [
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    ReactiveFormsModule,
  ],
  exports: [
    FileUploadComponent
  ]
})

export class FileUploadAppModule {

}
