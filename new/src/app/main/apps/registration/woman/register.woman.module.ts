import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { RegisterWomanComponent } from './register.woman.component';
import {RegistrationService} from '../registration.service';
import {SharedModule} from '../../../../shared.module';

const routes = [
    {
        path     : '**',
        component: RegisterWomanComponent
    }
];

@NgModule({
    declarations: [
        RegisterWomanComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        FuseSharedModule,
        SharedModule
    ],
    providers: [RegistrationService]
})
export class RegisterWomanModule 
{
}
