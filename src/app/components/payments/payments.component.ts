import { Component, OnInit } from '@angular/core';
import { USER_SESSION } from 'src/app/include/constants';
import { SessionService } from '../../services/session.service';
import {Jwt} from '../../include/jwt';
import { JwtModel } from 'src/app/models/jwt.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PaymentModel } from 'src/app/models/payments.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  public userData:JwtModel;
  public data;
  public iduser;
  public paymentModels: PaymentModel[];
  constructor(private session: SessionService,
              private auth: AuthService,
              private router: Router,) {
  }

  ngOnInit(): void {
    this.userData=Jwt.toObject(this.session.get(USER_SESSION));
    this.auth.getUser(this.userData.usuarioEmail).subscribe(response=>{
      this.data=response.success;
      this.iduser=this.data.id;
      this.getPayments(this.iduser);
    });
  }

  public getPayments(iduser:number): void {
    this.auth.getPayment({iduser}).subscribe(
      Response => {
        this.paymentModels = Response.success;
      } );
  }


}
