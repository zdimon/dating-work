import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { APP_CONFIG } from '../../settings';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { timer } from 'rxjs';

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'app-man-register-form',
  templateUrl: '../../templates/registration/man.register.form.component.html',
  styles: []
})
export class ManRegisterFormComponent {
  loginForm: FormGroup;
  is_registered: boolean = false;
  email: string = '';
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    @Inject(APP_CONFIG) private app_config
    ){

      this.loginForm = this.fb.group({
        email: [
          '',
          [Validators.required, Validators.email],
          this.validateEmailNotTaken.bind(this)
        ]
      });

    }


    validateEmailNotTaken = (input: AbstractControl) => {
      return this.checkEmailNotTaken(input.value).pipe(
        debounceTime(5000),
        map((rez: any) => {
          if (rez.status==1) {
              return {
                  isExists: true
              };
          }
          return null;
        }));
    }



  checkEmailNotTaken(email: string) {
    let data = {'email': email};
    return this.http
      .post(`${this.app_config.APIurl}/check/email`, data);
  }

  onSubmit() {
    let data = {'email': this.loginForm.get('email').value};
    return this.http
      .post(`${this.app_config.APIurl}/register/man`, data).subscribe(
        (rez) => {
          console.log(rez);
          this.is_registered = true;
          this.email = this.loginForm.get('email').value;
        }
      );
  }

}
