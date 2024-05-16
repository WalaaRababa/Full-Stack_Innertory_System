import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { UpdateComponent } from './update/update.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./login/login.component').then(mod => mod.LoginComponent) },
    { path: 'home', loadComponent: () => import('./home/home.component').then(mod => mod.HomeComponent) },
    {path:'create',component:ProductComponent},
    {path:'update/:id',component:UpdateComponent},

    { path: 'transaction', loadComponent: () => import('./tranaction/component').then(mod => mod.TransactionComponent) },];

