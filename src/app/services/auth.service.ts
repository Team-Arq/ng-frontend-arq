import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserModel } from '../models/user.model';
import {PaymentModel} from '../models/payments.model';

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {

  constructor( private http: HttpClient ) {
  }

  registerUser( body: { name: string, surname: string, email: string, password: string } ): Observable<UserModel> {
    return this.http.post<UserModel>( `${ environment.root_api }${ environment.endpoints.register_user }`, body );
  }

  loginUser( body: { email: string, password: string } ): Observable<{ success: string }> {
    return this.http.post<{ success: string }>( `${ environment.root_api }${ environment.endpoints.login_user }`, body );
  }
  logoutUser( body:{email:string}):Observable<{success:String}>{
    return this.http.post<{ success: string }>(`${ environment.root_api }${ environment.endpoints.logout_user }`,body);
  }

  editUser(body:{name:string, password: string,email:string}):Observable<{success:String}>{
    return this.http.put<{ success: string }>(`${ environment.root_api }${ environment.endpoints.edit_user }`,body);
  }
  getUser(email:string):Observable<any>{
    return this.http.get<any>(`${ environment.root_api }${ environment.endpoints.get_user }`,{params:{email}});
  }
  createPayment( body: { description: string, price: string, id_user: number, id_service: number } ): Observable<PaymentModel> {
    return this.http.post<PaymentModel>( `${ environment.root_api }${ environment.endpoints.create_Payment }`, body );
  }

  getPayment(body:{iduser:number}):Observable<any>{
    return this.http.get<any>(`${environment.root_api}${environment.endpoints.get_Payments}?iduser=${body.iduser}`);
  };

  
}
