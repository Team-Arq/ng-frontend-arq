import { Component, OnInit } from '@angular/core';
import { ServiceModel } from '../../models/service.model';
import { Router } from '@angular/router';
import { USER_SESSION } from '../../include/constants';
import { SessionService } from '../../services/session.service';

@Component( {
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: [ './service-details.component.scss' ]
} )
export class ServiceDetailsComponent implements OnInit {

  public date = '';
  public minDate = new Date();
  public service: ServiceModel;
  public logged = false;

  constructor( private router: Router, private session: SessionService ) {
  }

  ngOnInit(): void {
    // Check user session
    this.logged = this.session.exists( USER_SESSION );

    if ( localStorage.getItem( 'service' ) === undefined ) {
      this.router.navigate( [ '', 'services' ] );
    } else {
      this.service = JSON.parse( localStorage.getItem( 'service' ) );
    }
  }
}
