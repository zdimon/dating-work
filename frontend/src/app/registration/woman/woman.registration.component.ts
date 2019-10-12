import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../settings';
import {RegistrationService} from '../registration.service';
import { Inject } from '@angular/core';
import { TokenService } from '../../service/token.service';


@Component({
  selector: 'app-woman-registration',
  templateUrl: '../../templates/registration/woman.registration.component.html',
  styles: []
})
export class WomanRegistrationComponent {

  props: any;
  lang: string = 'en';

  constructor(
    private translate: TranslateService,
    private http: HttpClient,
    @Inject(APP_CONFIG) private app_config,
    private service: RegistrationService,
    private token_service: TokenService,
  ){

    this.getProps();

  }

  getProps(){
    this.service.getFormProps('female').subscribe((data: any) => {
      this.props = data;
      console.log(this.props);
    })
  }



  setlang(lang: string){
    this.translate.use(lang);
    this.lang = lang;
    this.token_service.setLanguage(lang);
    this.getProps();
  }


}
