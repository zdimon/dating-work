interface Settings {
  production: boolean;
  APIurl: string;
  domain: string;
}

import {InjectionToken} from '@angular/core';

export const APP_CONFIG = new InjectionToken<SettingClass>('APP_CONFIG');


export class SettingClass implements Settings {
  production: boolean=  false;
  APIurl: string = 'http://localhost:8085';
  domain: string = 'http://localhost:8085';
}
import { SocketIoConfig } from 'ngx-socket-io';
export const SOCKET_CONFIG: SocketIoConfig = { url: 'http://localhost:8888', options: {path:'/websocket'} };

import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClientModule } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'http://localhost:8085/i18n/', '.json');
}