import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { APP_INITIALIZER } from '@angular/core';
import { APP_CONFIG, SettingClass, SOCKET_CONFIG } from './settings';
import { SharedModule } from './shared.module';


///// translating
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpLoaderFactory} from './settings';
import {HttpClient} from '@angular/common/http';

/// socket
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

/// interceptor
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interseptor';

import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { FakeDbService } from 'app/fake-db/fake-db.service';
import { AppComponent } from 'app/app.component';
import { AppStoreModule } from 'app/store/store.module';
import { LayoutModule } from 'app/layout/layout.module';

/// authorization initialization
import {AuthModule} from './auth/auth.module'; 
import {AuthGuard} from './auth/auth.guard';
import { InitService } from './auth/init.service';
export function init_app(init_service: InitService) {
    return () => init_service.init();
}
//////  

/// Socket service 
import {SocketService} from './socket/socket.service';


const appRoutes: Routes = [
    {
        path        : 'apps',
        loadChildren: './main/apps/apps.module#AppsModule'
        //canActivate: [AuthGuard]
    },
    {
        path        : 'pages',
        loadChildren: './main/pages/pages.module#PagesModule'
    },
    {
        path        : 'ui',
        loadChildren: './main/ui/ui.module#UIModule'
    },
    {
        path        : 'documentation',
        loadChildren: './main/documentation/documentation.module#DocumentationModule'
    },
    {
        path        : 'angular-material-elements',
        loadChildren: './main/angular-material-elements/angular-material-elements.module#AngularMaterialElementsModule'
    },

   

    {
        path      : '**',
        redirectTo: '/pages/errors/error-404'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        SharedModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot({
            loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient]
            }
          }),
      
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        AppStoreModule,
        AuthModule,
        SocketIoModule.forRoot(SOCKET_CONFIG)
    ],
    providers: [
        AuthGuard,
        {
            provide: APP_INITIALIZER,
            useFactory: init_app,
            deps: [InitService],
            multi: true
          },  
          {
            provide: APP_CONFIG,
            useClass: SettingClass
          },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
          },
          SocketService  
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
