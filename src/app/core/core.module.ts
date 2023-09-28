import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { WindowUtilService } from '../shared/services/window-util.service';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';

@NgModule({
  declarations: [PageHeaderComponent, LoadingOverlayComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PoModule,
  ],
  providers: [WindowUtilService],
  exports: [PageHeaderComponent, LoadingOverlayComponent]
})
export class CoreModule {
//   static forRoot(): ModuleWithProviders<CoreModule> {
//     return {
//       ngModule: CoreModule,
//     };
//   }
}
