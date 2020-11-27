import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceModel } from '../../models/service.model';
import { ServicesService } from '../../services/services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { Jwt } from '../../include/jwt';
import { USER_SESSION } from '../../include/constants';
import { SessionService } from '../../services/session.service';

@Component( {
  selector: 'app-public-services',
  templateUrl: './public-services.component.html',
  styleUrls: [ './public-services.component.scss' ]
} )
export class PublicServicesComponent implements OnInit {

  public theServices: ServiceModel[] = [];
  public loading = false;
  public userData: UserModel;
  public logged = false;
  private criteria: string;

  constructor( private service: ServicesService, private snackBar: MatSnackBar, private roter: Router,
               private session: SessionService, private route: ActivatedRoute ) {
    this.criteria = this.route.snapshot.params.criteria;
  }

  ngOnInit(): void {


    // Check user session
    this.logged = this.session.exists( USER_SESSION );

    if ( this.criteria !== undefined ) {
      this.searchService();
    } else {
      this.getServices();
    }
  }

  public searchService(): void {
    this.service.searchService( this.criteria ).subscribe( response => {
      this.theServices = response.success;
    }, error => {
      this.snackBar.open( 'No se encontraron servicios relacionados con tu búsqueda', 'Aceptar', { duration: 3000 } );
    } );
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
