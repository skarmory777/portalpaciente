import { Injectable } from '@angular/core';
import { AppConfig } from './config.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config!: AppConfig;

  private _config: AppConfig = {
    apiUrl: 'http://localhost:8051/api/',
    apiVersion: 'v1',
    hostName: 'localhost',
    userName: 'mestre',
    password: 'totvs',
    codColigada: 1,
    unidade: 'Portal de agendamento - Hospital Totvs',
  };

  get(): AppConfig {
    const json = this.loadTextFileAjaxSync(
      'assets/config.json',
      'application/json'
    );
    if (!json) {
      return this._config;
    }
    this.config = JSON.parse(json);

    this.config.apiUrl = !this.config.apiUrl.endsWith('/')
      ? `${this.config.apiUrl}/`
      : this.config.apiUrl;

    return this.config;
  }

  private loadTextFileAjaxSync(filePath: any, mimeType: any) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', filePath, false);
    if (mimeType != null && xmlhttp.overrideMimeType) {
      xmlhttp.overrideMimeType(mimeType);
    }
    xmlhttp.send();
    if (xmlhttp.status === 200) {
      return xmlhttp.responseText;
    } else {
      return null;
    }
  }
}
