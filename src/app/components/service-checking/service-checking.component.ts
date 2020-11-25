import { Component, OnInit } from '@angular/core';
import { ServiceModel } from '../../models/service.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../include/form.utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { USER_SESSION } from 'src/app/include/constants';
import { SessionService } from '../../services/session.service';
import {Jwt} from '../../include/jwt';
import { JwtModel } from 'src/app/models/jwt.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
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
  public userData:JwtModel;
  public data;
  public iduser;
  constructor( private router: Router, private form: FormBuilder, private snack: MatSnackBar,private session: SessionService,
    private auth: AuthService, ) {
  }

  ngOnInit(): void {
    if ( localStorage.getItem( 'service' ) === undefined ) {
      this.router.navigate( [ '', 'services' ] );
    } else {
      this.service = JSON.parse( localStorage.getItem( 'service' ) );
      console.log(this.service);
    }

    this.checking = this.form.group( {
      date: [ { value: '', disabled: false }, [ Validators.required ] ],
      hour: [ { value: '', disabled: false }, [ Validators.required ] ]
    }, FormUtils.validator );
    this.userData=Jwt.toObject(this.session.get(USER_SESSION));
    this.auth.getUser(this.userData.usuarioEmail).subscribe(response=>{
      this.data=response.success;
      this.iduser=this.data.id;
    });
  }

  public paypal(): void {

    this.snack.open( 'Redirigiendo a PayPal...' );
    this.auth.createPayment({
      description:this.service.description,
      price:this.service.price,
      id_user:this.iduser,
      id_service:this.service.id
    }).subscribe( response =>{
      console.log(response);
    })
  }

  
}
