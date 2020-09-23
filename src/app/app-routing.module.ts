import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegitrationComponent } from './components/user-regitration/user-regitration.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PublicDashboardComponent } from './components/public-dashboard/public-dashboard.component';

const routes: Routes = [ {
  path: '',
  component: PublicDashboardComponent,
  children: [ {
    path: '',
    component: HomeComponent,
    data: { title: 'Cooper - El héroe que necesitas' }
  }, {
    path: 'account/profile',
    component: UserProfileComponent,
    data: { title: 'Cooper - Cuenta de usuario' }
  } ]
}, {
  path: 'account/login',
  component: UserLoginComponent,
  data: { title: 'Cooper - Ingresar' }
}, {
  path: 'account/register',
  component: UserRegitrationComponent,
  data: { title: 'Cooper - Registrate' }
}, {
  path: '**',
  redirectTo: '',
  pathMatch: 'full'
} ];

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule {
}
