import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { USER_SESSION } from '../../include/constants';
import { Router, RouterOutlet } from '@angular/router';

@Component( {
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: [ './admin-dashboard.component.scss' ],
} )
export class AdminDashboardComponent implements OnInit {
  private previousPath = '';
  public userData;
  public logged = false;

  constructor( private session: SessionService,
               private router: Router,
               private snackBar: MatSnackBar ) {
  }

  ngOnInit(): void {

    // Check user session
    this.logged = this.session.exists( USER_SESSION );

    if ( !this.logged ) {
      this.snackBar.open( 'Debes ingresar a tu cuenta.', 'Aceptar', { duration: 3000 } );
      this.router.navigate( [ '' ] );
    }
  }

  public logout(): void {
    this.session.delete( USER_SESSION );
    this.logged = false;

    this.snackBar.open( 'Tu sesión ha sido cerrada', 'Aceptar', {
      duration: 3000
    } );

    this.router.navigate( [ '' ] );
  }
}
