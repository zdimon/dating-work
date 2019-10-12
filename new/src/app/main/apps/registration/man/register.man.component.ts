import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../../../settings';
import { Inject } from '@angular/core';
import { switchMap, map, debounceTime } from 'rxjs/operators';


@Component({
    selector     : 'register',
    templateUrl  : './register.man.component.html',
    styleUrls    : ['./register.man.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class RegisterManComponent implements OnInit, OnDestroy
{
    registerForm: FormGroup;
    is_registered: boolean = false;
    email: string = '';

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private http: HttpClient,
        @Inject(APP_CONFIG) private app_config
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: false
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.registerForm = this._formBuilder.group({
            email          : ['', [
                                   Validators.required, 
                                   Validators.email
                                  ],
                this.validateEmailNotTaken.bind(this)
            ],
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
        let data = {'email': this.registerForm.get('email').value};
        return this.http
          .post(`${this.app_config.APIurl}/register/man`, data).subscribe(
            (rez) => {
              this.is_registered = true;
              this.email = this.registerForm.get('email').value;
            }
          );
      }
    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
