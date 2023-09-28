import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PoModule, PoToolbarModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { CpfValidatorDirective } from './directives/cpf-validator/cpf-validator.directive';
import { StringFormatPipe } from './pipes/string/string-format.pipe';
import { SenhaChecklistComponent } from './components/senha-checklist/senha-checklist.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    PoModule,
    PoToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PoModule,
    PoTemplatesModule,
    CpfValidatorDirective,
    StringFormatPipe,
    SenhaChecklistComponent
  ],
  declarations: [CpfValidatorDirective, StringFormatPipe, SenhaChecklistComponent],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
    };
  }
}
