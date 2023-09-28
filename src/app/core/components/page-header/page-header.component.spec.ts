import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { WindowUtilService } from 'src/app/shared/services/window-util.service';
import { PageHeaderComponent } from './page-header.component';
import * as TypeMoq from 'typemoq';
import { configureTestSuite } from 'ng-bullet';

const windowUtilServiceMock = TypeMoq.Mock.ofType(WindowUtilService).object;
let windowUtilService: WindowUtilService;

describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        PageHeaderComponent
      ],
      providers: [
        { provide: WindowUtilService, useValue: windowUtilServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    windowUtilService = fixture.debugElement.injector.get(WindowUtilService);
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve validar se exibe botão voltar', () => {
    const spyIsWebView = spyOn(windowUtilService, 'isWebView');

    component.exibirBotaoVoltar = true;
    spyIsWebView.and.returnValue(true);

    component.ngOnInit();

    expect(component.exibirBotaoVoltar).toBeTrue();
    expect(windowUtilService.isWebView).toHaveBeenCalledTimes(0);
    spyIsWebView.calls.reset();

    component.exibirBotaoVoltar = true;
    spyIsWebView.and.returnValue(false);

    component.ngOnInit();

    expect(component.exibirBotaoVoltar).toBeTrue();
    expect(windowUtilService.isWebView).toHaveBeenCalledTimes(0);
    spyIsWebView.calls.reset();

    component.exibirBotaoVoltar = false;
    spyIsWebView.and.returnValue(true);

    component.ngOnInit();

    expect(component.exibirBotaoVoltar).toBeTrue();
    expect(windowUtilService.isWebView).toHaveBeenCalledTimes(1);
    spyIsWebView.calls.reset();

    component.exibirBotaoVoltar = false;
    spyIsWebView.and.returnValue(false);

    component.ngOnInit();

    expect(component.exibirBotaoVoltar).toBeFalse();
    expect(windowUtilService.isWebView).toHaveBeenCalledTimes(1);
  });

  it('deve validar se webView', () => {
    spyOn(windowUtilService, 'isWebView').and.returnValue(true);

    expect(component.viewIsMobile).toBeTrue();
    expect(windowUtilService.isWebView).toHaveBeenCalled();
  });

  it('deve validar se webView', () => {
    spyOn(windowUtilService, 'isMobileDevice').and.returnValue(true);

    expect(component.isMobile).toBeTrue();
    expect(windowUtilService.isMobileDevice).toHaveBeenCalled();
  });

  it('deve disparar o  método voltar da classe WindoUtilService', () => {
    spyOn(windowUtilService, 'voltar').and.callThrough();

    component.voltar();

    expect(windowUtilService.voltar).toHaveBeenCalled();
  });

  it('deve emitir evento para subscritos', () => {
    let emitted: boolean;
    component.voltarEvento.subscribe((event: boolean) => emitted = event);

    component.voltar();

    expect(emitted).toBe(false);
  });
});
