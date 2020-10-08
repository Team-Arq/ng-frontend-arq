import { Component, OnInit } from '@angular/core';

@Component( {
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [ './user-profile.component.scss' ]
} )
export class UserProfileComponent implements OnInit {
  public cooperhero = true;
  firstart=true;
  secondstart=true;
  thirsdtart=true;
  fourstart=true;
  fivestart=false;


  constructor() {
  }

  ngOnInit(): void {
  }

}
