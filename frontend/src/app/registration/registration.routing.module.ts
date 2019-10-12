import { ManRegistrationComponent } from './man/man.registration.component';
import { WomanRegistrationComponent } from './woman/woman.registration.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgencyRegistrationComponent } from './agency/agency.registration.component';



const routes: Routes = [
  {
    path: 'registration/man',
    component: ManRegistrationComponent
  },
  {
    path: 'registration/woman',
    component: WomanRegistrationComponent
  },
  {
    path: 'registration/agency',
    component: AgencyRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule {}
