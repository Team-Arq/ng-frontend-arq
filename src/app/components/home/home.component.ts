import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
} )
export class HomeComponent implements OnInit {

  public search: FormGroup;

  constructor( private form: FormBuilder ) {
  }

  ngOnInit(): void {

    // Start search
    this.search = this.form.group( {} );
  }

}
