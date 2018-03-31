import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SearchComponent } from './search.component';

/**
 * 这里做个知识备忘录
 * 新加组件，就要添加到module里
 * 新加路由也一样，添加到module里，或者打到根module里
 * 
 */

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})

export class SearchModule {

}
