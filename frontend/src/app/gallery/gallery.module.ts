import { SharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {GalleryComponent} from './gallery.component';
import { GalleryService } from '../store/gallery/gallery.service';
import {DetailComponent} from './detail.component';
import {GalleryComponentService} from '../service/gallery.service';

@NgModule({
  declarations: [
    GalleryComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,

  ],
  exports: [GalleryComponent, DetailComponent],
  providers: [
    GalleryService,
    GalleryComponentService
  ]
})
export class GalleryModule { }
