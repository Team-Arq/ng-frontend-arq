import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ROUTER_TRANSITION } from '../../include/animations';
import { SessionService } from '../../services/session.service';
import { USER_SESSION } from '../../include/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {Jwt} from '../../include/jwt';
import { JwtModel } from 'src/app/models/jwt.model';
@Component( {
  selector: 'app-public-dashboard',
  templateUrl: './public-dashboard.component.html',
  styleUrls: [ './public-dashboard.component.scss' ],
  animations: [ ROUTER_TRANSITION ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class PublicDashboardComponent implements OnInit {
  private previousPath = '';
  public userData:JwtModel;
  public logged = false;
  constructor( private session: SessionService,
               private snackBar: MatSnackBar,
               private auth: AuthService,
               private router: Router, ) {
  }

  ngOnInit(): void {
    this.userData=Jwt.toObject(this.session.get(USER_SESSION))
    // Check user session
    this.logged = this.session.exists( USER_SESSION );
  }

  public getPageTransition( routerOutlet: RouterOutlet ): any {
    if ( routerOutlet.isActivated ) {
      let transitionName = 'section';
      
      const { path } = routerOutlet.activatedRoute.routeConfig;
      const isSame = this.previousPath === path;
      const isBackward = this.previousPath.startsWith( path );
      const isForward = path.startsWith( this.previousPath );

      if ( isSame ) {
        transitionName = 'none';
      } else if ( isBackward && isForward ) {
        transitionName = 'initial';
      } else if ( isBackward ) {
        transitionName = 'backward';
      } else if ( isForward ) {
        transitionName = 'forward';
      }

      this.previousPath = path;

      return transitionName;
    }
  }

  public logout(): void {
    this.session.delete( USER_SESSION );
    this.logged = false
    this.auth.logoutUser({
      email:this.userData.usuarioEmail
    }).subscribe( response => {
      this.snackBar.open( 'Tu sesión ha sido cerrada', 'Aceptar', {
        duration: 3000
    });
    });
    
}
}
