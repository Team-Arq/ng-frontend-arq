import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
} )
export class HomeComponent implements OnInit {

  public search: FormGroup;

  constructor( private form: FormBuilder, private router: Router ) {
  }

  ngOnInit(): void {

    // Start search
    this.search = this.form.group( {
      criteria: [ { value: '', disabled: false }, [ Validators.required ] ]
    } );
  }

  doSearch(): void {
    this.router.navigate( [ '', 'services', 'search', this.search.get( 'criteria' ).value ] );
  }
}
