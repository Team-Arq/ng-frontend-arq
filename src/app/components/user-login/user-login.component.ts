import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../include/form.utils';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { USER_SESSION } from '../../include/constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component( {
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: [ './user-login.component.scss' ]
} )
export class UserLoginComponent implements OnInit {

  public loginGroup: FormGroup;
  public loading = false;

  constructor( private builder: FormBuilder,
               private auth: AuthService,
               private router: Router,
               private session: SessionService,
               private snackBar: MatSnackBar ) {
  }

  ngOnInit(): void {

    // Validate if user is in session
    if ( this.session.exists( USER_SESSION ) ) {

      this.snackBar.open( 'Ya tienes tu cuenta iniciada...', 'Entiendo', { duration: 3000 } );
      setTimeout( () => this.router.navigate( [ '' ] ), 100 );
    }

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

    this.loading = true;

    this.auth.loginUser( {
      email: this.loginGroup.get( 'email' ).value,
      password: this.loginGroup.get( 'password' ).value
    } ).subscribe( response => {
      this.session.save( USER_SESSION, response.success ); // Start session
      this.router.navigate( [ '' ] ); // Redirect to landing
      this.loading = false;
    }, error => {

      this.loading = false;

      // Delete current session
      if ( this.session.get( USER_SESSION ) !== undefined ) {
        this.session.delete( USER_SESSION );
      }

      // Show validation error
      Swal.fire( {
        title: 'Ups! Hubo un error inesperado.',
        text: error.error.error || error.message,
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'Aceptar'
      } );
    } );
  }
}
