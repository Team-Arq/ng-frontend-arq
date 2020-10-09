import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../include/form.utils';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  public editGroup: FormGroup;
  public loading = false;
  public email='nd@nd.com';
  constructor(private builder: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private session: SessionService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  // Setting register form
  this.editGroup = this.builder.group( {
    name: [ { value: '', disabled: false }, [ Validators.required ] ],
    password: [ { value: '', disabled: false }, [ Validators.required ] ],
    password_confirm: [ { value: '', disabled: false }, [ Validators.required ] ],
  }, [ FormUtils.validator ] );
}
  
  public passwordValidation(): void {
    if ( this.editGroup.get( 'password' ).value !== this.editGroup.get( 'password_confirm' ).value ) {
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
  public doEdit(): void {

    // Password validation
    if ( this.editGroup.get( 'password' ).value !== this.editGroup.get( 'password_confirm' ).value ) {
      return;
    }
    // Validate form
    if ( this.editGroup.invalid ) {
      this.editGroup.markAllAsTouched();
      return;
    }
    this.loading = true;
    // Do edit
    this.auth.editUser( {
      name: this.editGroup.get( 'name' ).value,
      password: this.editGroup.get( 'password' ).value,
      email:this.email
    } ).subscribe( response => {
      const t = this;
      this.loading = false;

      Swal.fire( {
        title: 'Usuario Actualizado',
        text: 'Se han actualizado los campos.',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Continuar',
        allowOutsideClick: false,
        preConfirm( inputValue: any ): any {
          t.router.navigate( [ '', '' ] );
          return null;
        }
      } );
    }, error => {
      this.loading = false;
      Swal.fire( {
        title: 'Lo sentimos',
        text: error.error.error || error.message,
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'Aceptar'
      } );
    } );
  }

  
  


}
