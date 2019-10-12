// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import { SessionService } from './session.service';



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        //private store: Store<SessionState>, 
        private router: Router,
        private session_service: SessionService
        ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {

            console.log('guard');
        
            return this.session_service.isLoggedIn.pipe(
                tap((val) => {
                    console.log(val);
                    if(!val) this.router.navigateByUrl('/pages/auth/login');
                })
            )
        
        

    }
}
