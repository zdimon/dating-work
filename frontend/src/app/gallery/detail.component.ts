import { SocketService } from './../service/socket.service';

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../store/users/users.store';
import { GalleryState } from '../store/gallery/gallery.store';
import { getUserGalleryList } from '../store/gallery/gallery.selector';
import * as galleryAction from '../store/gallery/gallery.action';
import {getUserById} from '../store/gallery/gallery.selector';
import { ActivatedRoute } from '@angular/router';
import {GalleryComponentService} from '../service/gallery.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: '../templates/gallery/detail.component.html',
  styleUrls: ['../templates/gallery/detail.component.css'],
  providers: []
})
export class DetailComponent implements OnInit {

  user: any;
  private sub: any;

  constructor(
    private gallery_store: Store<GalleryState>,
    private route: ActivatedRoute,
    private gallery_service: GalleryComponentService
  ) {
      //this.users = this.gallery_store.select(getUserGalleryList);

   }

   ngOnInit() {
     console.log('Detail');
     // this.gallery_store.dispatch(new galleryAction.Get());
     this.sub = this.route.params.subscribe(params => {
      console.log(params['id']);
      this.gallery_service.get_detail(params['id']).subscribe(data => {
        this.user = data;
      });
      //this.gallery_store.select(getUserById(params['id'])).subscribe(data => {
      //  console.log(data);
      //});
   });
  }




  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
