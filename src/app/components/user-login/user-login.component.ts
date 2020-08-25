import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../include/form.utils';

@Component( {
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: [ './user-login.component.scss' ]
} )
export class UserLoginComponent implements OnInit {

    public loginGroup: FormGroup;

    constructor( private builder: FormBuilder ) {
    }

    ngOnInit(): void {

        // Setting login form
        this.loginGroup = this.builder.group( {
            email: [ { value: '', disabled: false }, [ Validators.required ] ],
            password: [ { value: '', disabled: false }, [ Validators.required ] ]
        }, [ FormUtils.validator ] );
    }

    public doLogin(): void {

        // Validate form
        if ( this.loginGroup.invalid ) {
            this.loginGroup.markAllAsTouched();
            return;
        }
    }
}
