import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Observer, Subject, Subscription } from 'rxjs';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../../../settings';
import { debounceTime, map } from 'rxjs/operators';
import { RegistrationService } from '../registration.service';

@Component({
    selector     : 'register',
    templateUrl  : './register.agency.component.html',
    styleUrls    : ['./register.agency.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class RegisterAgencyComponent implements OnInit, OnDestroy
{
    registerForm: FormGroup;
    is_registered = false;
    email: string = '';
    public images: any[] = [];

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private http: HttpClient,
        @Inject(APP_CONFIG) private app_config,
        private registrationService: RegistrationService
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
    ngOnInit(): void {

      this.registerForm = this._formBuilder.group({
        email: ['', [Validators.required, Validators.email],
          this.validateEmailNotTaken.bind(this)],
        name: ['', [Validators.required]],
        name_boss: ['', [Validators.required]],
        login: ['', [Validators.required]],
        password: ['', [Validators.required]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        country: ['', [Validators.required]],
        skype: [''],
        phone1: [''],
        phone2: [''],
        photo: [''],
        count_woman: [''],
        working_time: ['']
      });

    }

    validateEmailNotTaken = (input: AbstractControl) => {
        return this.checkEmailNotTaken(input.value).pipe(
          debounceTime(5000),
          map((rez: any) => {
            if (rez.status === 1) {
                return {
                    isExists: true
                };
            }
            return null;
          }));
    }

    checkEmailNotTaken(email: string): Observable<any> {
        const data = {'email': email};
        return this.http
          .post(`${this.app_config.APIurl}/check/email`, data);
    }

    public onFileChange(event): void {
      const reader = new FileReader();

      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;

        this.getBase64(file).subscribe(data => {
          this.images.push(data);
        });

      }
    }

    public deleteImg(index: number): void {
      if (index > -1) {
        this.images.splice(index, 1);
      }
    }

    private getBase64(file): Observable<any> {
      return Observable.create((observer: Observer<string>) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          const imgd = reader.result as string;
          observer.next(imgd);
          // observer.next(imgd.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""));
          observer.complete();
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
          observer.complete();
        };
      });

    }

    public onSubmit(): Subscription {
        const data = {'email': this.registerForm.get('email').value};
        return this.http
          .post(`${this.app_config.APIurl}/register/man`, data).subscribe(
            (rez) => {
              console.log(rez);
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
