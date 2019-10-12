import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {SessionService} from './session.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    token: string;
    language: string = 'en';

    constructor(
        private session_service: SessionService
    ){

     
    }

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = this.session_service.getToken();

        if (this.session_service.getLanguage() === null){
          this.session_service.setLanguage('en');
        }
        const language = this.session_service.getLanguage();


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
