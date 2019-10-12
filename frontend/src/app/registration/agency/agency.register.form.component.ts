import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { APP_CONFIG } from '../../settings';
import {RegistrationService} from '../registration.service';
import {debounceTime, map} from 'rxjs/operators';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Observable, Observer, Subscribable } from 'rxjs';

@Component({
  selector: 'app-agency-register-form',
  templateUrl: './tpl/agency.register.form.component.html',
  styles: []
})
export class AgencyRegisterFormComponent implements OnInit{
  form: FormGroup;
  is_done: boolean = false;
  images: any[] = [];
  form_data: any;





  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    @Inject(APP_CONFIG) private app_config,
    private service: RegistrationService
    ){

      this.form = this.fb.group({
        email: [
          '',
          [Validators.required, Validators.email]
        ],
        name: ['',[Validators.required]],
        name_boss: ['',[Validators.required]],
        login: ['',[Validators.required]],
        password: ['',[Validators.required]],
        address: ['',[Validators.required]],
        city: ['',[Validators.required]],
        country: ['',[Validators.required]],
        skype: [''],
        phone1: [''],
        phone2: [''],
        photo: [''],
        count_woman: [''],
        working_time: [''],
        phoneArray: this.fb.array([])
      });

    }

    ngOnInit(){

    }

    buildForm(){

    }


    get phoneArray() {
      return this.form.get('phoneArray') as FormArray;
    }

    addItem(item) {
      //this.phoneArray.push(item);
      this.phoneArray.push(this.fb.control(''));
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

    onFileChange(event) {
      let reader = new FileReader();

      if(event.target.files && event.target.files.length) {
        const [file] = event.target.files;

        this.getBase64(file).subscribe(data => {
          this.images.push(data);
        });


      }
    }

    onSubmit() {
      this.form_data = this.form.value;
      this.form_data['images'] = this.images;
      console.log(this.form_data);
      this.service.registerAgency(this.form_data).subscribe(data => {
        this.is_done = true;
      })
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
        observer.complete();
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
        observer.complete();
      };
    });

 }

}
