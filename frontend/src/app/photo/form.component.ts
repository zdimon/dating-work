import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {PhotoService} from '../service/photo.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: '../templates/photo/form.component.html',
  styles: []
})
export class PhotoFormComponent {

  public files: any;
  @Output() photouploaded = new EventEmitter()
 
  constructor(
      private http: PhotoService
    ) {
      this.files;
   
   }

   ngOnInit() {
   
  }

  onFileChanged(event) {
    console.log(event.target.files[0]);
    this.files = event.target.files[0];
    this.onUpload();
  }


  onUpload() {
    const formData = new FormData();
    formData.append('myfile', this.files, this.files.name);
    this.http.sendPhoto(formData)
      .subscribe((rez) => {
          this.photouploaded.emit(event);
      });
  }

  
}
