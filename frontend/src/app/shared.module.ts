import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {AddCreditComponent} from './profile/add.credit.component';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MainLoginComponent} from './auth/login/login.component';
import {AuthGuard} from './auth/auth.guard';
import {BaseComponent} from './base/base.component';
import {HeaderComponent} from './base/header.component';
import {MenuComponent} from './base/menu.component';
import { Routes, RouterModule } from '@angular/router';
import { UserPhotoComponent } from './_core/widget/userphoto/user.photo.component';
import {ArraySortPipe} from './_core/pipes/sortby.pipe';

@NgModule({
  declarations:[
    AddCreditComponent,
    MainLoginComponent,
    BaseComponent,
    HeaderComponent,
    MenuComponent,
    UserPhotoComponent,
    ArraySortPipe
  ],
  imports: [
      ModalModule.forRoot(),
      FormsModule,
      CommonModule,
      RouterModule,
      TranslateModule.forRoot()
  ],
  exports: [
    TranslateModule,
    ModalModule,
    AddCreditComponent,
    FormsModule,
    CommonModule,
    MainLoginComponent,
    BaseComponent,
    HeaderComponent,
    MenuComponent,
    RouterModule,
    UserPhotoComponent,
    ArraySortPipe
  ],
  providers: [
    BsModalService,
    AuthGuard
  ]
})

export class SharedModule { }
