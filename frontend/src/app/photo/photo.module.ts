import { SharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MyPhotoComponent } from './my.photo.component';
import {PhotoFormComponent} from './form.component';
import {PhotoService} from '../service/photo.service';
import {PhotoItemComponent} from './photo.item.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import {PhotoCropComponent} from './photo.crop.component';
@NgModule({
  declarations: [
    PhotoFormComponent,
    MyPhotoComponent,
    PhotoItemComponent,
    PhotoCropComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ImageCropperModule
  ],
  exports: [],
  providers: [
    PhotoService
  ]
})
export class PhotoModule { }
