import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceModel } from '../../models/service.model';
import { ServicesService } from '../../services/services.service';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-public-services',
  templateUrl: './public-services.component.html',
  styleUrls: [ './public-services.component.scss' ]
} )
export class PublicServicesComponent implements OnInit {

  public theServices: ServiceModel[] = [];
  public loading = false;

  constructor( private service: ServicesService, private snackBar: MatSnackBar, private roter: Router ) {
  }

  ngOnInit(): void {

    this.getServices();
  }

  public getServices(): void {
    this.loading = true;
    this.service.getServicesList().subscribe( response => {
      this.loading = false;
      this.theServices = response.success;
    }, error => {
      this.loading = false;
      this.snackBar.open( 'Error al traer servicios', 'Aceptar', {
        duration: 3000
      } );
    } );
  }

  public selectedService( service: ServiceModel ): void {
    localStorage.setItem( 'service', JSON.stringify( service ) );
    this.roter.navigate( [ '', 'services', service.id ] );
  }
}
