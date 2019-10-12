import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { QLoginComponent } from './qlogin/qlogin.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    QLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([])
  ],
  exports: [
    QLoginComponent
  ]
})
export class AuthModule { }
