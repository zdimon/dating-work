// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// NGRX
import { select, Store } from '@ngrx/store';
import { TokenService } from '../service/token.service';
// Auth reducers and selectors 

import { selectIsAuth } from '../store/session/session.selector';
import { SessionState} from '../store/session/session.store';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private store: Store<SessionState>, 
        private router: Router,
        private token_service: TokenService
        ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {

        /*
        return this.store
            .pipe(
                select(selectIsAuth),
                tap(loggedIn => {
                    if (!loggedIn) {
                        this.router.navigateByUrl('/login');
                    }
                })
            );
        */
        
            return this.token_service.isLoggedIn.pipe(
                tap((val) => {
                    if(!val) this.router.navigateByUrl('/login');
                })
            )
            
        

    }
}
