import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from './index.component';

const routes: Routes = [
    {
        path     : '**',
        component: IndexComponent,
        children : []
    }
];

@NgModule({
    declarations: [
        IndexComponent
    ],
    imports     : [
        RouterModule.forChild(routes)
    ],
    providers   : [
        
    ]
})
export class IndexModule
{
}

