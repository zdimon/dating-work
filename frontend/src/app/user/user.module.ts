import { UserListItemComponent } from './list.item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './list.component';
import {FormsModule} from '@angular/forms';
import { UserRoutingModule } from './user.routing.module';
import {UserInlineFormComponent} from './inline.form.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    UserListComponent,
    UserListItemComponent,
    UserInlineFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    PaginationModule.forRoot()
  ],
  exports: [UserListItemComponent]
})
export class UserModule { }
