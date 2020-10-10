import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ServiceModel } from '../models/service.model';
import { ServiceTypeModel } from '../models/serviceType.models';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  //services
  registerService(body: {
    name: string;
    typeService: string;
    description: string;
    price: string;
  }): Observable<ServiceModel> {
    return this.http.post<ServiceModel>(
      `${environment.root_api}${environment.endpoints.register_service}`,
      body
    );
  }

  getServicesList(): Observable<{success:ServiceModel[]}>{return this.http.get<{success:ServiceModel[]}>(
    ` ${environment.root_api}${environment.endpoints.get_list_services}`);
    };


//types services
  getServiceType(): Observable<{success:ServiceTypeModel[]}>{return this.http.get<{success:ServiceTypeModel[]}>(
  ` ${environment.root_api}${environment.endpoints.get_services_types}`);
  };
}
