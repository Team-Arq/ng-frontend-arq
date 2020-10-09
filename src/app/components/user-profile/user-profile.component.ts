import { Component, OnInit } from '@angular/core';
import { USER_SESSION } from 'src/app/include/constants';
import { SessionService } from '../../services/session.service';
import {Jwt} from '../../include/jwt';
import { JwtModel } from 'src/app/models/jwt.model';
@Component( {
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [ './user-profile.component.scss' ]
} )
export class UserProfileComponent implements OnInit {
  public cooperhero = false;
  firstart=true;
  secondstart=true;
  thirsdtart=true;
  fourstart=true;
  fivestart=false;
  public userData:JwtModel;

  constructor(private session: SessionService) {
  }
  
  ngOnInit(): void {
    this.userData=Jwt.toObject(this.session.get(USER_SESSION));
    this.userData.usuarioEmail
  }

}
