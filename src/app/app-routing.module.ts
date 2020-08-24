import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserLoginComponent } from './components/user-login/user-login.component';

const routes: Routes = [ {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Cooper - El héroe que necesitas' }
}, {
    path: 'account/login',
    component: UserLoginComponent,
    data: {title: 'Cooper - Ingresar'}
}, {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
} ];

@NgModule( {
    imports: [ RouterModule.forRoot( routes ) ],
    exports: [ RouterModule ]
} )
export class AppRoutingModule {
}
