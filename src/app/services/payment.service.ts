import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaypalModel } from '../models/paypal.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable( {
  providedIn: 'root'
} )
export class PaymentService {

  constructor( private http: HttpClient ) {
  }

  public getToken(): Observable<PaypalModel> {
    return this.http.get<PaypalModel>( `${ environment.root_api }${ environment.endpoints.paypal_token }` );
  }

  public payout( token: string, value: string, email: string = 'sb-m4vgw3719469@personal.example.com' ): Observable<any> {
    return this.http.post<any>( `${ environment.root_api }${ environment.endpoints.paypal_payout }`, {
      token,
      value,
      email,
      modo: 'EMAIL'
    } );
  }
}
