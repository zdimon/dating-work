import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../../../settings';
import { Inject } from '@angular/core';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import {RegistrationService} from '../registration.service';
import { Observable, Observer, Subscribable } from 'rxjs';


@Component({
    selector     : 'register',
    templateUrl  : './register.woman.component.html',
    styleUrls    : ['./register.woman.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class RegisterWomanComponent implements OnInit, OnDestroy
{
    form: FormGroup;
    is_registered: boolean = false;
    email: string = '';
    
    form_data: any;
    oneFields: any;
    manyFields: any;
    images: any[] = []

    private props: any;
    

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private fb: FormBuilder,
        private http: HttpClient,
        @Inject(APP_CONFIG) private app_config,
        private service: RegistrationService
    )
    {
        this.service.getFormProps('female').subscribe((data: any) => {
            this.props = data;
            this.buildForm();
        })
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

        this.form = this.fb.group({
            email: [
              '',
              [Validators.required, Validators.email],
              this.validateEmailNotTaken.bind(this)
            ],
            name: ['',[Validators.required]],
            about_me: ['',[Validators.required]],
            birthday: ['',[Validators.required]],
            lookingfor: ['',[Validators.required]],
            job: ['',[Validators.required]],
            goal: ['',[Validators.required]],
            city: ['',[Validators.required]],
            photo: ['']
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

      buildForm(){
        for(let field in this.props.one){
          this.form.addControl(this.props.one[field].alias, new FormControl(''));
        }
        for(let field in this.props.many){
          this.form.addControl(this.props.many[field].alias, this.buildMany(this.props.many[field].values));
        }
        this.oneFields = this.props.one;
        this.manyFields = this.props.many;
      }

      buildMany(options: any){
        const arr = options.map(item => {
          return this.fb.control(false);
        });
        return this.fb.array(arr);
      }

      onFileChange(event) {
        let reader = new FileReader();
  
        if(event.target.files && event.target.files.length) {
          const [file] = event.target.files;
  
          this.getBase64(file).subscribe(data => {
            //console.log(data);
            this.images.push(data);
          });
  
  
        }
      }


      deleteImg(index: number){
        if (index > -1) {
          this.images.splice(index, 1);
        }
      }
    
    
      getBase64(file) {
        return Observable.create((observer: Observer<string>) => {
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function () {
            let imgd = reader.result as string;
            observer.next(imgd);
            //observer.next(imgd.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""));
            observer.complete();
          };
          reader.onerror = function (error) {
            console.log('Error: ', error);
            observer.complete();
          };
        });
    
     }      

    onSubmit() {
        this.is_registered = true;
        this.form_data = this.form.value;
        this.form_data['images'] = this.images;
        this.service.registerWoman(this.form_data).subscribe(data => {
            
        })
    }

    test(){
        this.is_registered = true;
    }
    testt(){
        this.is_registered = false;
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
