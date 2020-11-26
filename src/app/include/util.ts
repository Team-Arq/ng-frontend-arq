import { USD_VALUE } from './constants';

export class Util {
  public static cCOPtoUSD( cop: string ): string {
    return ( Number.parseInt( cop, 0 ) / Number.parseInt( USD_VALUE, 0 ) ).toString();
  }
}
