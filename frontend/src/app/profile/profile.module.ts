import { SharedModule } from './../shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile.routing.module';
import { ProfileComponent } from './profile.component';
import { PhotoService } from '../store/photos/photos.service';
import { BillingService } from '../service/billing.service';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [],
  providers: [PhotoService, BillingService]
})
export class ProfileModule { }
