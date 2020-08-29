import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../include/form.utils';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-user-regitration',
  templateUrl: './user-regitration.component.html',
  styleUrls: [ './user-regitration.component.scss' ]
} )
export class UserRegitrationComponent implements OnInit {

  public registerGroup: FormGroup;
  public loading = false;

  constructor( private builder: FormBuilder, private auth: AuthService, private router: Router ) {
  }

  ngOnInit(): void {

    // Setting register form
    this.registerGroup = this.builder.group( {
      name: [ { value: '', disabled: false }, [ Validators.required ] ],
      surname: [ { value: '', disabled: false }, [ Validators.required ] ],
      email: [ { value: '', disabled: false }, [ Validators.required ] ],
      password: [ { value: '', disabled: false }, [ Validators.required ] ],
      password_confirm: [ { value: '', disabled: false }, [ Validators.required ] ],
    }, [ FormUtils.validator ] );
  }

  public passwordValidation(): void {
    if ( this.registerGroup.get( 'password' ).value !== this.registerGroup.get( 'password_confirm' ).value ) {
      Swal.fire( {
        title: 'Ups!',
        text: 'Las contraseñas no coinciden.',
        icon: 'error',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar'
      } ).then( _ => {
      } );
    }
  }

  public doRegister(): void {

    // Password validation
    if ( this.registerGroup.get( 'password' ).value !== this.registerGroup.get( 'password_confirm' ).value ) {
      return;
    }

    // Validate form
    if ( this.registerGroup.invalid ) {
      this.registerGroup.markAllAsTouched();
      return;
    }

    this.loading = true;

    // Do registration
    this.auth.registerUser( {
      name: this.registerGroup.get( 'name' ).value,
      surname: this.registerGroup.get( 'surname' ).value,
      email: this.registerGroup.get( 'email' ).value,
      password: this.registerGroup.get( 'password' ).value
    } ).subscribe( response => {
      const t = this;
      this.loading = false;

      Swal.fire( {
        title: 'Ahora eres miembro!',
        text: 'Te has registrado exitosamente como miembro de Cooper.',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Entrar',
        allowOutsideClick: false,
        preConfirm( inputValue: any ): any {
          t.router.navigate( [ '', 'account', 'login' ] );
          return null;
        }
      } );
    }, error => {
      this.loading = false;
      Swal.fire( {
        title: 'Lo sentimos',
        text: error.error.message || error.message,
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'Aceptar'
      } );
    } );
  }
}
