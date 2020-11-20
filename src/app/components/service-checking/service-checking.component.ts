import { Component, OnInit } from '@angular/core';
import { ServiceModel } from '../../models/service.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../include/form.utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component( {
  selector: 'app-service-checking',
  templateUrl: './service-checking.component.html',
  styleUrls: [ './service-checking.component.scss' ]
} )
export class ServiceCheckingComponent implements OnInit {

  public date = '';
  public minDate = new Date();
  public service: ServiceModel;
  public checking: FormGroup;

  constructor( private router: Router, private form: FormBuilder, private snack: MatSnackBar ) {
  }

  ngOnInit(): void {
    if ( localStorage.getItem( 'service' ) === undefined ) {
      this.router.navigate( [ '', 'services' ] );
    } else {
      this.service = JSON.parse( localStorage.getItem( 'service' ) );
    }

    this.checking = this.form.group( {
      date: [ { value: '', disabled: false }, [ Validators.required ] ],
      hour: [ { value: '', disabled: false }, [ Validators.required ] ]
    }, FormUtils.validator );
  }

  public paypal(): void {

    this.snack.open( 'Redirigiendo a PayPal...' );
  }
}
