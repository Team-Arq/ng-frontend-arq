import { Component, OnInit } from '@angular/core';
import { ServiceModel } from '../../models/service.model';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: [ './service-details.component.scss' ]
} )
export class ServiceDetailsComponent implements OnInit {

  public date = '';
  public minDate = new Date();
  public service: ServiceModel;

  constructor( private router: Router ) {
  }

  ngOnInit(): void {
    if ( localStorage.getItem( 'service' ) === undefined ) {
      this.router.navigate( [ '', 'services' ] );
    } else {
      this.service = JSON.parse( localStorage.getItem( 'service' ) );
    }
  }
}
