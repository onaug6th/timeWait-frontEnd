import {ModuleWithProviders, NgModule} from "@angular/core";
import {ArticleComponent} from "./article-box.component";
import {CommonModule} from "@angular/common";
import { RouterModule } from '@angular/router';

@NgModule({
  imports:[CommonModule,RouterModule],
  declarations: [ArticleComponent],
  exports: [ArticleComponent]
})
export class ArticleComponentModule {
  
}
