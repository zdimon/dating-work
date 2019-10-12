import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../settings';
import { Inject } from '@angular/core';
import { TokenService } from '../../service/token.service';


@Component({
  selector: 'app-agency-registration',
  templateUrl: './tpl/agency.registration.component.html',
  styles: []
})
export class AgencyRegistrationComponent {

  props: any;
  lang: string = 'en';

  constructor(
    private translate: TranslateService,
    private http: HttpClient,
    @Inject(APP_CONFIG) private app_config,
    private token_service: TokenService,
  ){

  }



  setlang(lang: string){
    this.translate.use(lang);
    this.lang = lang;
    this.token_service.setLanguage(lang);
  }


}
