import {ModuleWithProviders, NgModule} from "@angular/core";
import {AppPaginationComponent} from "./pagination.component";
import {CommonModule} from "@angular/common";

@NgModule({
  imports:[CommonModule],
  declarations: [AppPaginationComponent],
  exports: [AppPaginationComponent]
})
export class AppPaginationModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: AppPaginationModule};
  }
}
