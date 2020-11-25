import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegitrationComponent } from './components/user-regitration/user-regitration.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ServiceRegistrationComponent } from './components/service-registration/service-registration.component';
import { ServiceListAdminComponent } from './components/service-list-admin/service-list-admin.component';
import { PublicDashboardComponent } from './components/public-dashboard/public-dashboard.component';
import { CooperDashboardComponent } from './components/cooper-dashboard/cooper-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SupportDashboardComponent } from './components/support-dashboard/support-dashboard.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { TypeServiceComponent } from './components/type-service/type-service.component';
import { PublicServicesComponent } from './components/public-services/public-services.component';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';
import { ServiceCheckingComponent } from './components/service-checking/service-checking.component';
import { PaymentsComponent } from './components/payments/payments.component';
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
  }, {
    path: 'account/edit',
    component: EditProfileComponent,
    data: { title: 'Cooper - Editar Usuario' }
  }, {
    path: 'services',
    component: PublicServicesComponent,
    data: { title: 'Cooper - Servicios' }
  }, {
    path: 'services/:id',
    component: ServiceDetailsComponent,
    data: { title: 'Cooper - Servicios' }
  }, {
    path: 'services/:id/checking',
    component: ServiceCheckingComponent,
    data: { title: 'Cooper - Checking' }
  } , {
    path: 'acount/payments',
    component: PaymentsComponent,
    data: { title: 'Cooper - Pagos' }
  } ]
}, {
  path: 'coop',
  component: CooperDashboardComponent,
  children: []
}, {
  path: 'admin',
  component: AdminDashboardComponent,
  children: [ {
    path: 'service/registration',
    component: ServiceRegistrationComponent,
    data: { title: 'Cooper - Registrar nuevo servicio' }
  }, {
    path: 'service/adminlist',
    component: ServiceListAdminComponent,
    data: { title: 'Cooper - Admin Service' }
  }, {
    path: 'service/type',
    component: TypeServiceComponent,
    data: { title: 'Cooper - Registrar un tipo de servicio' }
  } ]
}, {
  path: 'support',
  component: SupportDashboardComponent,
  children: []
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
