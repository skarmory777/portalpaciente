import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConfigService } from 'src/app/core/config/config.service';
import { AppConfig } from '../config/config.model';
import { encodeBase64 } from 'src/app/shared/util/utilitarios';

interface HttpOptions {
  headers?: HttpHeaders;
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  reportProgress?: boolean;
  withCredentials?: boolean;
  responseType?: any;
}

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  private config!: AppConfig;
  private httpOptions!: HttpOptions;

  constructor(private http: HttpClient) {
    this.config = new ConfigService().get();
    this.inicializar();
  }

  private inicializar(): void {
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization:
          'Basic ' +
          encodeBase64(`${this.config.userName}:${this.config.password}`),
      }),
      responseType: 'json',
    };
  }

  public resolveUrl(controllerName: string, params?: string | number) {
    params = params ? `/${params}` : '';
    const baseUrl = this.config.apiUrl.replace(/\/+$/, '');
    return `${baseUrl}/hcg/${this.config.apiVersion}/${controllerName}/${params}`;
  }

  public get<T>(
    controllerName: string,
    params?: string | number
  ): Observable<T> {
    params = params || '';
    const url = this.resolveUrl(controllerName, params);
    return this.http.get<T>(url, this.httpOptions);
  }

  public post<T>(
    controllerName: string,
    params: string | number,
    body: any
  ): Observable<T> {
    const url = this.resolveUrl(controllerName, params);
    return this.http.post<T>(url, body, this.httpOptions);
  }

  public put<T>(
    controllerName: string,
    params: string | number,
    body: any
  ): Observable<T> {
    const url = this.resolveUrl(controllerName, params);
    return this.http.put<T>(url, body, this.httpOptions);
  }

  public patch<T>(
    controllerName: string,
    params: string | number,
    body: any
  ): Observable<T> {
    const url = this.resolveUrl(controllerName, params);
    return this.http.patch<T>(url, body, this.httpOptions);
  }
}
