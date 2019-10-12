import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from './users.component';

const routes: Routes = [
    {
        path     : '**',
        component: UsersComponent,
        children : []
    }
];

@NgModule({
    declarations: [
        UsersComponent
    ],
    imports     : [
        RouterModule.forChild(routes)
    ],
    providers   : [
        
    ]
})
export class UsersModule
{
}

