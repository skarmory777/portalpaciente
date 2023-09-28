import { Component, ViewEncapsulation } from '@angular/core';

import { ConfigService } from './core/config/config.service';
import { StorageService } from './shared/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  get titulo(): string {
    return this.configService.get().unidade;
  }
  
  get usuarioLogado() {
    return this.storageService.usuarioLogado();
  }

  constructor(
    private storageService: StorageService,
    private configService: ConfigService
  ) {}
}
