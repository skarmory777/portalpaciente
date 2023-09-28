import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ContaService } from '../../conta/services/conta.service';
import { Usuario } from '../../conta/models/usuario.model';
import { filter, finalize, map } from 'rxjs';
import { LoadingHelper } from 'src/app/core/helpers/loading.helper';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';

@Injectable()
export class HomeResolver implements Resolve<Usuario> {
  constructor(
    private contaService: ContaService,
    private loadingHelper: LoadingHelper,
    private store: Store<AppState>
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    this.loadingHelper.showLoading();      

    //console.log(this.store.source);

    // console.log( Object.values(this.store.source).filter((usuarioReducer) => usuarioReducer) );

    //return Object.values(this.store.source).filter((usuarioReducer) => usuarioReducer);
  
    // return this.store.forEach(function(a){
    //   return a.usuarioReducer; 
    // });
    // const arr = [];

    // // [ { name: 'Samantha' }, { name: 'Chris' }, { name: 'Mike' } ]       
    // arr.push(this.store.forEach(function(a){
    //   if (a.usuarioReducer.usuario !== undefined){
    //     arr.push(a.usuarioReducer);   
    //   } 
    //   //return a.usuarioReducer.usuario;
    // })); 

    // console.log(arr);
    // console.log(lista);

    return this.contaService.obter().pipe(
      finalize(() => this.loadingHelper.hideLoading()),
      map((dados) => {
        //console.log(dados);
        return dados;
      })
    );
    // return this.store
    // .select((state) => state.usuarioReducer)
    // .subscribe(
    //   (data) =>{ 
    //   //o data deveria ter os valores que vc esta querendo validar
    //   console.log(data);
    // });
  }
}
