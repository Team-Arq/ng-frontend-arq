import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/root/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { UserRegitrationComponent } from './components/user-regitration/user-regitration.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { HomeComponent } from './components/home/home.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CooperProfileComponent } from './components/cooper-profile/cooper-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { IConfig, NgxMaskModule } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {};

@NgModule( {
    declarations: [
        AppComponent,
        UserRegitrationComponent,
        UserLoginComponent,
        HomeComponent,
        SearchResultComponent,
        UserProfileComponent,
        CooperProfileComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ServiceWorkerModule.register( 'ngsw-worker.js', { enabled: environment.production } ),
        ReactiveFormsModule,
        NgxMaskModule.forRoot( maskConfig ),
        MatButtonModule
    ],
    providers: [],
    bootstrap: [ AppComponent ]
} )
export class AppModule {
}
