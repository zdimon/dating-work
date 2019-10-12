import { Subscription } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, ViewChild, Inject, OnDestroy } from '@angular/core';
import { PhotoState, Photo } from '../store/photos/photos.store';
import { PhotoService } from '../store/photos/photos.service';
import { getPhotoList } from '../store/photos/photos.selector';
import * as PhotoActions from '../store/photos/photos.action';
import * as sessionActions from '../store/session/session.action';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import {TokenService} from '../service/token.service';
import { APP_CONFIG } from '../settings';
import { SocketService } from '../service/socket.service';

@Component({
  selector: 'app-my-photo',
  templateUrl: '../templates/photo/my.photo.component.html',
  styles: []
})
export class MyPhotoComponent implements OnInit, OnDestroy {

  @ViewChild('hardwareVideo', {static: false}) hardwareVideo: any;
  @ViewChild('canvas', {static: false}) canvas: any;
  is_taken: boolean = false;
  is_saved: boolean = false;
  is_video: boolean = false;
  image_data: any;
  editphoto: Photo;

  _navigator = <any> navigator;
  localStream;

  photos: PhotoState;
  currentPage: number = 1;

  $_update: Subscription;

  constructor(
    private store: Store<PhotoState>,
    private http_service: PhotoService,
    private http: HttpClient,
    @Inject(APP_CONFIG) private app_config,
    private token_service: TokenService,
    private socket_service: SocketService
    ) {

     this.store.select(getPhotoList).subscribe((data: any) => {
       this.photos = data;
      });

      this.$_update = this.socket_service.photo_moderation$.subscribe(data => {
        console.log('dfddddddddddddddd');
        this.store.dispatch(new PhotoActions.Get(this.currentPage));
      })

   }

   ngOnInit() {
    this.getPage(this.currentPage);
  }

  getPage(page: number){
    console.log(`Getting page ${page}`);
    this.currentPage = page;
    this.store.dispatch(new PhotoActions.Get(this.currentPage));
  }

  getVideo(){
    this.is_video = true;
    const video = this.hardwareVideo.nativeElement;
    this._navigator = <any>navigator;

    this._navigator.getUserMedia = ( this._navigator.getUserMedia || this._navigator.webkitGetUserMedia
    || this._navigator.mozGetUserMedia || this._navigator.msGetUserMedia );

    this._navigator.mediaDevices.getUserMedia({video: { width: 400,  height: 300 }, audio: false})
      .then((stream) => {
        this.localStream = stream;
        video.srcObject=stream;
        video.play();
    });

  }

  stopStream() {
    const tracks = this.localStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    this.is_video = false;
  }

  takePic(){
    let context = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.hardwareVideo.nativeElement, 0, 0, 400, 300);
    let dataURL = this.canvas.nativeElement.toDataURL();
    this.image_data = {imgBase64: dataURL, token: this.token_service.getToken()};
    this.is_taken = true;
    this.is_saved = false;
    this.savePic();
    this.stopStream();
  }

  savePic(){

    return this.http
      .post(`${this.app_config.APIurl}/photos/save/webcam/image`, this.image_data).subscribe(
        (rez: any) => {
          this.is_saved = true;
          this.is_taken = false;
          this.getPage(this.currentPage);
        }
      );
  }

  photoUploaded(event){
    this.getPage(this.currentPage);
  }

  doSetMain(photo: Photo){
    photo.is_main = true;
    this.store.dispatch(new PhotoActions.SetMain(photo));
    this.store.dispatch(new sessionActions.SetMainPhoto(photo.image_small));


  }
  doDelete(photo: Photo){
    photo.is_deleted = true;
    this.store.dispatch(new PhotoActions.Delete(photo));
  }

  doEditPhoto(photo){
    this.editphoto = photo;
  }


  ngOnDestroy(){
    this.$_update.unsubscribe();
  }
}
