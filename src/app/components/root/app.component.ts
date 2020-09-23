import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ROUTER_TRANSITION } from '../../include/animations';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  animations: [ ROUTER_TRANSITION ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class AppComponent implements AfterViewChecked {
  private previousPath = '';

  constructor( private cdRef: ChangeDetectorRef ) {

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

  ngAfterViewChecked(): void {
    console.log( 'Changes detected!' );
  }
}
