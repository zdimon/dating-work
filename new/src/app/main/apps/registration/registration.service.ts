
import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injector } from '@angular/core';
import { APP_CONFIG } from '../../../settings';


@Injectable()
export class RegistrationService {


  constructor(
    private http: HttpClient,
    public injector: Injector,
    @Inject(APP_CONFIG) private app_config
  ) {


  }


  public getFormProps(gender: string) {
    return this.http.get(`${this.app_config.APIurl}/props/list/${gender}`);
  }

  public registerWoman(data: any) {
    return this.http.post(`${this.app_config.APIurl}/account/register/woman`, data );
  }

  public registerAgency(data: any) {
    return this.http.post(`${this.app_config.APIurl}/account/register/agency`, data );
  }

}
