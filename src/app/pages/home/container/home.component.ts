import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';
import { ComponenteBase } from 'src/app/core/components/componente-base';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { Usuario } from '../../conta/models/usuario.model';
import { HomePt } from '../i18n/home-pt';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { obterUsuarioSucesso } from 'src/app/store/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent extends ComponenteBase {
  literals = HomePt;
  usuario!: Usuario;
  readonly menus: Array<PoMenuItem> = [
    {
      ...this.literals.menus.home,
    },
    {
      ...this.literals.menus.agendar,
      action: () => {
        console.log('Agendar');
      },
    },
    {
      ...this.literals.menus.agendamentos,
      action: () => {
        console.log('Meus Agendamentos');
      },
      badge: { value: 1 },
    },
    {
      ...this.literals.menus.resultados,
    },
  ];

  constructor(
    objInjector: Injector,
    private autenticacaoService: AuthenticationService,
    private store: Store<AppState>
  ) {
    super(objInjector);
  }

  sairPortal() {
    this.poAlert.confirm({
      ...this.literals.sairPortal,
      confirm: () => {
        this.loadingHelper.showLoading();
        this.autenticacaoService.logout().subscribe(() => {
          this.loadingHelper.hideLoading();
        });
      },
    });
  }
  ngOnInit(): void {    
    this.obterMeuPerfil();
  }

  navegarPara(rota: string) {
    this.router.navigate([rota]);
  }

  obterMeuPerfil() {    
    this.usuario = new Usuario(this.activatedRoute.snapshot.data['usuario']);
    if (this.usuario.codCadastro > 0) {
      this.store.dispatch(obterUsuarioSucesso({ payload: this.usuario }));
    }
  }
}
