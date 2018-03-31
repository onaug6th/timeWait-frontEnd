import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserSettingComponent } from './user-setting.component';
import { FileUploadAppModule } from '../../../common/file-upload/file-upload.module';

/**
 * 这里做个知识备忘录
 * 新加组件，就要添加到module里
 * 新加路由也一样，添加到module里，或者打到根module里
 * 
 */

@NgModule({
  declarations: [
    UserSettingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadAppModule
  ]
})

export class UserSettingModule {

}
