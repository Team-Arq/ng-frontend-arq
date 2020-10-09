import { Component, OnInit } from '@angular/core';
import { USER_SESSION } from 'src/app/include/constants';
import { SessionService } from '../../services/session.service';
import {Jwt} from '../../include/jwt';
import { JwtModel } from 'src/app/models/jwt.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  public data;
  constructor(private session: SessionService,
              private auth: AuthService,
              private router: Router,) {
  }
  
  ngOnInit(): void {
    this.userData=Jwt.toObject(this.session.get(USER_SESSION));
    this.auth.getUser(this.userData.usuarioEmail).subscribe(response=>{
      this.data=response.success;
    });
  }
  
}
