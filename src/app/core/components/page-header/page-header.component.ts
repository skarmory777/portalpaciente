import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { WindowUtilService } from 'src/app/shared/services/window-util.service';
import { PageHeaderPt } from './i18n/page-header-pt';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class PageHeaderComponent implements OnInit {
  @Output() voltarEvento = new EventEmitter<boolean>();
  @Input('habilitar-voltar') exibirBotaoVoltar = false;
  @Input('cabecalho') cabecalho = PageHeaderPt.voltar;
  @Input('titulo') titulo = '';

  public get viewIsMobile(): boolean {
    return this.windowUtilService.isWebView();
  }

  public get isMobile(): boolean {
    return this.windowUtilService.isMobileDevice();
  }

  constructor(private windowUtilService: WindowUtilService) {}

  ngOnInit() {
    this.exibirBotaoVoltar = this.exibirBotaoVoltar || this.viewIsMobile;
  }

  voltar(): void {
    if (this.voltarEvento.observers.length > 0) {
      this.voltarEvento.emit(false);
    } else {
      this.windowUtilService.voltar();
    }
  }
}
