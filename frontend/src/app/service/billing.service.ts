
import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injector } from '@angular/core';
import { APP_CONFIG } from '../settings';

@Injectable()
export class BillingService {

  constructor(
    private http: HttpClient,
    public injector: Injector,
    @Inject(APP_CONFIG) private app_config
  ) {



  }

  public getPlans() {
    return this.http.get(`${this.app_config.APIurl}/settings/plan`)
  }

  public addCredits(data: any) {
    return this.http.post(`${this.app_config.APIurl}/settings/add/credits`, data)
  }


}
