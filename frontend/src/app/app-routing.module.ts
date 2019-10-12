import { BaseChatComponent } from './chat/components/base/base.chat.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './index/index.component';

import {MainLoginComponent} from './auth/login/login.component';
import {AuthGuard} from './auth/auth.guard';
import {BaseComponent} from './base/base.component';
import { ProfileComponent } from './profile/profile.component';
import {MyPhotoComponent} from './photo/my.photo.component';
import {DetailComponent} from './gallery/detail.component';
import {chatRoutes} from './chat/chat.routing.module';


const routes: Routes = [

  { path: 'dashboard', component: BaseComponent,
    children: [
			{
				path: '',
				component: IndexComponent
      },
			{
				path: 'profile',
				component: ProfileComponent
      },
			{
				path: 'photo',
				component: MyPhotoComponent
      },
			{
				path: 'chat',
        component: BaseChatComponent,
        children: chatRoutes
      },
			{
				path: 'detail/:id',
				component: DetailComponent
      },
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    ]
  },
  { path: 'login', component: MainLoginComponent },

  { path: '', redirectTo: 'dashboard' ,pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
