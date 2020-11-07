import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceModel } from '../models/service.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable( {
  providedIn: 'root'
} )
export class ServicesService {

  constructor( private http: HttpClient ) {
  }

  getServicesList(): Observable<{ success: ServiceModel[] }> {
    return this.http.get<{ success: ServiceModel[] }>( `${ environment.root_api }${ environment.endpoints.get_list_services }`, {} );
  }
}
