import { AgencyRegisterFormComponent } from './agency/agency.register.form.component';
import { SharedModule } from './../shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ManRegisterFormComponent } from './man/man.register.form.component';
import { RegistrationRoutingModule } from './registration.routing.module';
import { ManRegistrationComponent } from './man/man.registration.component';
import { WomanRegistrationComponent } from './woman/woman.registration.component';
import { WomanRegisterFormComponent } from './woman/woman.register.form.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {RegistrationService} from './registration.service';
import { AgencyRegistrationComponent } from './agency/agency.registration.component';

@NgModule({
  declarations: [
    ManRegisterFormComponent,
    ManRegistrationComponent,
    WomanRegistrationComponent,
    WomanRegisterFormComponent,
    AgencyRegistrationComponent,
    AgencyRegisterFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RegistrationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [],
  providers: [RegistrationService]
})
export class RegistrationModule { }
