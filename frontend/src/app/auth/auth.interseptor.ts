import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectToken, selectLanguage } from '../store/session/session.selector';
import {SessionState} from '../store/session/session.store';
import {TokenService} from '../service/token.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    token: string;
    language: string = 'en';

    constructor(
        private session_store: Store<SessionState>,
        private token_service: TokenService
    ){

      /*
        this.session_store.select(selectToken).subscribe(token => {
            this.token = token;
            console.log(this.token);
        }
        );
        this.session_store.select(selectLanguage).subscribe(lang => {
          this.language = lang;
          console.log(this.language);
        })
        */
    }

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = this.token_service.getToken();

        if (this.token_service.getLanguage() === null){
          this.token_service.setLanguage('en');
        }
        const language = this.token_service.getLanguage();


        if (idToken) {

            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Token " + idToken)
                    .set("Accept-Language", language)
            });

            return next.handle(cloned);
        }
        else {
              const cloned = req.clone({
                headers: req.headers.set("Accept-Language", language)
            });
            return next.handle(cloned);
        }
    }
}
