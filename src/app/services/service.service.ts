import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ServiceModel } from '../models/service.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  registerService(body: {
    nameService: string;
    typeservice: string;
    description: string;
    price: string;
  }): Observable<ServiceModel> {
    return this.http.post<ServiceModel>(
      `${environment.root_api}${environment.endpoints.register_service}`,
      body
    );
  }
}
