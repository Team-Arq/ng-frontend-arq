import { Component, OnInit } from '@angular/core';
import { ServiceModel } from '../../models/service.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../include/form.utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { USER_SESSION } from 'src/app/include/constants';
import { SessionService } from '../../services/session.service';
import { Jwt } from '../../include/jwt';
import { JwtModel } from 'src/app/models/jwt.model';
import { AuthService } from '../../services/auth.service';
import { PaypalModel } from '../../models/paypal.model';
import { PaymentService } from '../../services/payment.service';
import { Util } from '../../include/util';

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
  public userData: JwtModel;
  public data;
  public iduser;
  public paypalToken: PaypalModel;
  public loading = false;

  constructor( private router: Router, private form: FormBuilder, private snack: MatSnackBar, private session: SessionService,
               private auth: AuthService, private payment: PaymentService ) {
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

    this.userData = Jwt.toObject( this.session.get( USER_SESSION ) );
    this.auth.getUser( this.userData.usuarioEmail ).subscribe( response => {
      this.data = response.success;
      this.iduser = this.data.id;
    } );

    this.getToken();
  }

  public startPayment(): void {
    this.checking.get( 'date' ).disable();
    this.checking.get( 'hour' ).disable();
    this.loading = true;
  }

  public errorPayment(): void {
    this.checking.get( 'date' ).enable();
    this.checking.get( 'hour' ).enable();
    this.loading = false;
  }

  public getToken(): void {
    this.payment.getToken().subscribe( response => {
      this.paypalToken = response;
    }, error => {
      this.snack.open( 'No se pudo obtener token de Paypal, el pago no puede efectuarse...' );
    } );
  }

  public paypal(): void {
    const s = this.snack.open( 'Pagando a PayPal...' );
    this.startPayment();

    this.payment.payout( this.paypalToken.access_token, Util.cCOPtoUSD( this.service.price ) ).subscribe( response => {
      s.dismissWithAction();
      const suc = this.snack.open( 'Pago exitoso...' );

      this.auth.createPayment( {
        description: this.service.description,
        price: this.service.price,
        id_user: this.iduser,
        id_service: this.service.id
      } ).subscribe( res => {

        setTimeout( () => {
          this.router.navigate( [ '', 'account', 'history' ] ).then( _ => {
            suc.dismissWithAction();
          } );
        }, 1500 );

        console.log( res );
      } );
    }, error => {
      this.errorPayment();
      this.snack.open( 'Hubo un error al intentar efectuar el pago.', 'Aceptar' );
    } );
  }
}
