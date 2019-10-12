import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PhotoComponent} from './photo.component';

const routes: Routes = [
    {
        path     : '**',
        component: PhotoComponent,
        children : []
    }
];

@NgModule({
    declarations: [
        PhotoComponent
    ],
    imports     : [
        RouterModule.forChild(routes)
    ],
    providers   : [
        
    ]
})
export class PhotoModule
{
}

