import {EscapeHtmlPipe } from './domSanitizer.directive';
import {ModuleWithProviders, NgModule} from "@angular/core";

/**
 * 允许innerHTML读取样式或脚本
 */

@NgModule({
    declarations: [EscapeHtmlPipe],
    exports: [EscapeHtmlPipe]
  })
  export class EscapeHtmlModule {
    public static forRoot(): ModuleWithProviders {
      return {ngModule: EscapeHtmlModule};
    }
  }
  