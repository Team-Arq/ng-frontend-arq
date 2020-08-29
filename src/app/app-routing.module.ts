import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegitrationComponent } from './components/user-regitration/user-regitration.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [ {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Cooper - El héroe que necesitas' }
}, {
    path: 'account/login',
    component: UserLoginComponent,
    data: {title: 'Cooper - Ingresar'}
}
,{
    path: 'account/register',
    component:UserRegitrationComponent
} ,
{
    path: 'account/profile',
    component:UserProfileComponent
} ,{
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
}
];

@NgModule( {
    imports: [ RouterModule.forRoot( routes ) ],
    exports: [ RouterModule ]
} )
export class AppRoutingModule {
}
