import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
    {
        path: '',
        children: [
           {
               path: '',
               redirectTo: 'home',
               pathMatch: 'full',
             },
             {
               path: 'home',
              loadChildren: () => import('../pages/home/home.module')
              .then(m => m.HomeModule),
              },
       ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }