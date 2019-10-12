import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import {AuthGuard} from '../../auth/auth.guard';
const routes = [
    {
        path        : 'index',
        loadChildren: './index/index.module#IndexModule'
    },
    {
        path        : 'users',
        loadChildren: './users/users.module#UsersModule',
        canActivate: [AuthGuard]
    },
    {
        path        : 'photo',
        loadChildren: './photo/photo.module#PhotoModule',
        canActivate: [AuthGuard]
    },

    {
        path        : 'register/man',
        loadChildren: './registration/man/register.man.module#RegisterManModule'
    },
    
    {
        path        : 'register/woman',
        loadChildren: './registration/woman/register.woman.module#RegisterWomanModule'
    },
    {
        path        : 'register/agency',
        loadChildren: './registration/agency/register.agency.module#RegisterAgencyModule'
    },

    {
        path        : 'chat',
        loadChildren: './chat/chat.module#ChatModule'
    },
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ]
})
export class AppsModule
{
}
