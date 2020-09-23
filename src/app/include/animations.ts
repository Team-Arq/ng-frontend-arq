import { animate, group, query as q, style, transition, trigger } from '@angular/animations';

// tslint:disable-next-line:no-shadowed-variable
const query = ( style, animate, optional: { optional: boolean } = { optional: true } ) => q( style, animate, optional );

const fade = [
  query( ':enter, :leave', style( { position: 'fixed', width: '100%' } ) ),
  query( ':enter', [ style( { opacity: 0 } ) ] ),
  group( [
    query( ':leave', [
      animate( '500ms ease-out', style( { opacity: 0 } ) )
    ] ),
    query( ':enter', [
      style( { opacity: 0 } ),
      animate( '500ms ease-out', style( { opacity: 1 } ) ),
    ] ),
  ] )
];

const fadeInFromDirection = direction => [
  query( ':enter, :leave', style( { position: 'fixed', width: '100%' } ) ),
  group( [
    query( ':enter', [
      style( {
        transform: `translateY(${ direction === 'backward' ? '-' : '' }15%)`,
        opacity: 0,
      } ),
      animate(
        '500ms ease-out',
        style( { transform: 'translateY(0%)', opacity: 1 } ),
      ),
    ] ),
    query( ':leave', [
      style( { transform: 'translateY(0%)' } ),
      animate( '500ms ease-out', style( { opacity: 0 } ) ),
    ] ),
  ] ),
];

export const ROUTER_TRANSITION = trigger( 'routerTransition', [
  transition( '* => inital', fade ),
  transition( '* => section', fade ),
  transition( '* => forward', fadeInFromDirection( 'forward' ) ),
  transition( '* => backward', fadeInFromDirection( 'backward' ) ),
] );

