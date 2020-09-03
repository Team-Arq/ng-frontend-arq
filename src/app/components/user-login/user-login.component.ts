import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../include/form.utils';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: [ './user-login.component.scss' ]
} )
export class UserLoginComponent implements OnInit {

  public loginGroup: FormGroup;

  constructor( private builder: FormBuilder, private auth: AuthService, private router: Router ) {
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
    this.auth.loginUser( {
      email: this.loginGroup.get( 'email' ).value,
      password: this.loginGroup.get( 'password' ).value
    } ).subscribe( response => {
      const t = this;

      Swal.fire( {
        title: 'Login Exitoso!',
        text: 'Has ingresado Correctamente en Cooper',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Entrar',
        allowOutsideClick: false,
        preConfirm( inputValue: any ): any {
          t.router.navigate( [ '', 'account', 'profile' ] );
          return null;
        }
      } );
    }, error => {
      Swal.fire( {
        title: 'Password o contraseña Incorrectos',
        text: error.error.message || error.message,
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'Aceptar'
      } );
    } );
  }
}
