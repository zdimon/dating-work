import { Component, OnInit, Output, Input, EventEmitter, OnChanges } from '@angular/core';
import { ImageCroppedEvent, CropperPosition } from 'ngx-image-cropper';
import {Observable, Observer} from 'rxjs';
import {PhotoService} from '../service/photo.service';
import * as PhotoActions from '../store/photos/photos.action';
import { Store } from '@ngrx/store';
import { PhotoState, Photo } from '../store/photos/photos.store';
import * as sessionActions from '../store/session/session.action';
import {SessionState}  from '../store/session/session.store';

@Component({
  selector: 'app-photo-crop',
  templateUrl: '../templates/photo/photo.crop.component.html',
  styleUrls: ['../templates/photo/photo.crop.component.css'],
})
export class PhotoCropComponent implements OnInit {

  @Output() setmain = new EventEmitter();
  @Output() delete = new EventEmitter();
  _photo: any;


  get photo(){
    return this._photo;
  }

  @Input('photo') 
  set photo(value){
    this.is_croped = false;
    console.log('setting photo');
    console.log(value);
    this._photo = value;
 
    this.getBase64ImageFromURL(this._photo.image_big).subscribe(base64data => {    
      this.base64Image = 'data:image/jpg;base64,' + base64data;

    });
  
    
  }  

  base64Image: any;  
  croppedImage: any;
  imagePosition: any;
  is_croped: boolean =false ;
  croperPosition: CropperPosition = {x1:0, y1: 0, x2: 0, y2: 0};
  current_image_position: any;
  current_cropper_position: any;

  constructor(
    private photo_service: PhotoService,
    private store: Store<PhotoState>,
    private session_store: Store<SessionState>,
  ){

  }
  
  ngOnInit() {

  }

  

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      // create an image object
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
          // This will call another method that will create image from url
          img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
           observer.error(err);
        };
      } else {
          observer.next(this.getBase64Image(img));
          observer.complete();
      }
    });
 }


 getBase64Image(img: HTMLImageElement) {
  // We create a HTML canvas object that will create a 2d image
  var canvas = document.createElement("canvas");
  canvas.width = img.width || img.naturalWidth;
  canvas.height = img.height || img.naturalHeight;
  var ctx = canvas.getContext("2d");
  // This will draw image    
  ctx.drawImage(img, 0, 0);
  // Convert the drawn image to Data URL
  var dataURL = canvas.toDataURL("image/png");
return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

convertCropToStr(crop: any){
 return `${crop.x1},${crop.y1},${crop.x2},${crop.y2}`
}

imageCropped(event: ImageCroppedEvent) {
  this.croppedImage = event.base64;
  //console.log(event.imagePosition);
  this.current_image_position = event.imagePosition;
  this.current_cropper_position = event.cropperPosition;
 
}

cropperReady() {
  if(this._photo.croppos!==''){
  let pos = this._photo.croppos.split(',');
  let newpos = Object.assign({},{x1: parseInt(pos[0]), y1: parseInt(pos[1]), x2: parseInt(pos[2]), y2: parseInt(pos[3])})
  this.croperPosition = newpos
  }
}


cropSave(){
  let data = {
    id: this._photo.id,
    imgpos: this.current_image_position,
    croppos: this.current_cropper_position
  }  
  this.photo_service.sendCrop(data).subscribe((data: any) => {
    this.is_croped = true;
    this.store.dispatch(new PhotoActions.UpdatePhoto(data));
    if(this.photo.is_main){
      this.session_store.dispatch(new sessionActions.SetMainPhoto(data[this.photo.id].image_small))
    }

  });

}



}
