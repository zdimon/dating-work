import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './service/login.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndexComponent } from './index/index.component';
import { AuthModule } from './auth/auth.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FacadeService } from './facade';
import { APP_CONFIG, SettingClass, SOCKET_CONFIG } from './settings';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';



import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthInterceptor} from './auth/auth.interseptor';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { StoreModule } from '@ngrx/store';
import { UserOnlineService } from './service/user.online.service';
import { EffectsModule } from '@ngrx/effects';

//// services
import { InitService } from './service/init.service';
import {OnlineService} from './service/online.service';
import {SessionService} from './store/session/session.service';
import {TokenService} from './service/token.service';

import { AppReducers } from './store/index';
import { UserEffects } from './store/users/users.effect';
import { UserService } from './store/users/user.service';

/// Store effects
import { OnlineEffects } from './store/online/online.effect';
import {RoomEffects}  from './chat/store/chat.effect';
import {SessionEffects} from './store/session/session.effect';
import { GalleryEffects } from './store/gallery/gallery.effect';

import {ChatService} from './chat/services/chat.service';

// App modules
import { UserModule } from './user/user.module';
import { RegistrationModule } from './registration/registration.module';
import { ProfileModule } from './profile/profile.module';
import { PhotoEffects } from './store/photos/photos.effect';
import { PhotoModule } from './photo/photo.module';
import {ChatModule} from './chat/chat.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import {SharedModule} from './shared.module';

///// translating
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpLoaderFactory} from './settings';
import {HttpClient} from '@angular/common/http';
import { GalleryModule } from './gallery/gallery.module';

/////////////

export function init_app(init_service: InitService) {
  return () => init_service.init();
}

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),

    TranslateModule.forRoot({
      loader: {
                  provide: TranslateLoader,
                  useFactory: HttpLoaderFactory,
                  deps: [HttpClient]
      }
    }),

    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule,
    UserModule,
    CollapseModule.forRoot(),
    SocketIoModule.forRoot(SOCKET_CONFIG),
    StoreModule.forRoot(AppReducers),
    EffectsModule.forRoot([
      UserEffects,
      PhotoEffects,
      OnlineEffects,
      RoomEffects,
      SessionEffects,
      GalleryEffects
    ]),
    RegistrationModule,
    ProfileModule,
    PhotoModule,
    ChatModule,
    SharedModule,
    GalleryModule,
    StoreRouterConnectingModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument( {maxAge: 10} ) : []
  ],
  providers: [
    LoginService,
    FacadeService,
    InitService,
    AuthInterceptor,
    UserService,
    OnlineService,
    ChatService,
    SessionService,
    TokenService,
  {
    provide: APP_CONFIG,
    useClass: SettingClass
  },

  {
    provide: APP_INITIALIZER,
    useFactory: init_app,
    deps: [InitService],
    multi: true
  },

  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  UserOnlineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
