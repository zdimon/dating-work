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
  selector: 'app-woman-register-form',
  templateUrl: '../../templates/registration/woman.register.form.component.html',
  styles: []
})
export class WomanRegisterFormComponent implements OnInit{
  form: FormGroup;


  form_data: any;
  is_done: boolean = false;
  oneFields: any;
  manyFields: any;
  images: any[] = [];


  private _props: any;
  get props(){
    return this._props;
  }

  @Input() set props(value: any){
    this._props = value;
    if(value) this.buildForm();
  }

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    @Inject(APP_CONFIG) private app_config,
    private service: RegistrationService
    ){

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

    ngOnInit(){
      //this.service.getFormProps('female').subscribe((data: any) => {
        //console.log(data);


      //});
    }

    buildForm(){
      for(let field in this.props.one){
        //console.log(data.one[field]);
        this.form.addControl(this.props.one[field].alias, new FormControl(''));
      }
      for(let field in this.props.many){
        //console.log(data.many[field]);
        this.form.addControl(this.props.many[field].alias, this.buildMany(this.props.many[field].values));
        //this.form.addControl(data.many[field].alias, new FormControl(false));
      }
      this.oneFields = this.props.one;
      this.manyFields = this.props.many;
    }

    buildMany(options: any){
      const arr = options.map(item => {
        return this.fb.control(false);
        //console.log(item);
      });
      return this.fb.array(arr);
    }

    get fieldsArray() {
      return this.form.get('fieldsArray') as FormArray;
    }

    addItem(item) {
      //this.arrayFields.push(item);
      //this.fieldsArray.push(this.fb.control(''));
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
          //console.log(data);
          this.images.push(data);
        });


      }
    }

    onSubmit() {
      this.form_data = this.form.value;


      const formData = new FormData();
      Object.entries(this.form.value).forEach(
        ([key, value]: any[]) => {
          formData.set(key, value);
        }   );
        this.form_data['images'] = this.images;
      console.log(this.form_data);
      this.service.registerWoman(this.form_data).subscribe(data => {
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
        //observer.next(imgd.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""));
        observer.complete();
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
        observer.complete();
      };
    });

 }

}
