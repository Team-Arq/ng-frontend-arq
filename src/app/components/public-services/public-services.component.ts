import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceModel } from '../../models/service.model';
import { ServicesService } from '../../services/services.service';

@Component( {
  selector: 'app-public-services',
  templateUrl: './public-services.component.html',
  styleUrls: [ './public-services.component.scss' ]
} )
export class PublicServicesComponent implements OnInit {

  public theServices: ServiceModel[] = [];
  public loading = false;

  constructor( private service: ServicesService, private snackBar: MatSnackBar ) {
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
}
