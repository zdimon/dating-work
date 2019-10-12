import { NgModule } from '@angular/core';
import {SessionService} from './session.service';
import {AuthGuard} from './auth.guard';
import {InitService} from './init.service';
import {LoginService} from './login.service'


@NgModule({
    declarations: [

    ],
    imports     : [
    ],
    providers: [
        SessionService, 
        AuthGuard, 
        InitService,
        LoginService
    ],
    exports: [
    ]
})
export class AuthModule
{
}
