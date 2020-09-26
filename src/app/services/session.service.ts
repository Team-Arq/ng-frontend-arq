import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable( {
  providedIn: 'root'
} )
export class SessionService<T = any> {

  constructor( @Inject( LOCAL_STORAGE ) private storage: StorageService ) {
  }

  /**
   * Save any data in local storage
   * @param key unique key
   * @param value any value
   */
  public save( key: string, value: T ): void {
    this.storage.set( key, value );
  }

  /**
   * Get local storage data
   * @param key unique key
   */
  public get( key: string ): T | undefined {
    return this.storage.get( key );
  }

  /**
   * Remove local storage data
   * @param key any
   */
  public delete( key: string ): void {
    this.storage.remove( key );
  }

  /**
   * Check if local storage data exist
   * @param key unique key
   */
  public exists( key: string ): boolean {
    return this.storage.get( key ) !== undefined && this.storage.get( key ) !== null;
  }
}
