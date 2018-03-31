import {EscapeHtmlPipe } from './domSanitizer.directive';
import {ModuleWithProviders, NgModule} from "@angular/core";

@NgModule({
    declarations: [EscapeHtmlPipe],
    exports: [EscapeHtmlPipe]
  })
  export class EscapeHtmlModule {
    public static forRoot(): ModuleWithProviders {
      return {ngModule: EscapeHtmlModule};
    }
  }
  