import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoDialogService } from '@po-ui/ng-components';
import { configureTestSuite } from 'ng-bullet';
import * as TypeMoq from 'typemoq';
import { BarraFerramentasComponent } from './barra-ferramentas.component';

describe('BarraFerramentasComponent', () => {
  let component: BarraFerramentasComponent;
  let fixture: ComponentFixture<BarraFerramentasComponent>;
  const poDialogServiceService = TypeMoq.Mock.ofType(PoDialogService).object;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [BarraFerramentasComponent],
      providers: [
        { provide: PoDialogService, useValue: poDialogServiceService },
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraFerramentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
