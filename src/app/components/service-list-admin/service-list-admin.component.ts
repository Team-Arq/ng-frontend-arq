import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../include/form.utils';
import { ServiceService } from '../../services/service.service';
import { ServiceModel } from 'src/app/models/service.model';


@Component({
  selector: 'app-service-list-admin',
  templateUrl: './service-list-admin.component.html',
  styleUrls: ['./service-list-admin.component.scss']
})
export class ServiceListAdminComponent implements OnInit {

  //atributos
  public adminService: FormGroup;
  public ServiceModels: ServiceModel[];
  public ServiceModels2: string;

  constructor(   private builder: FormBuilder,
    private service: ServiceService) {
    
   }

  ngOnInit() {
      this.getServices();
      var ServiceModels = new ServiceModels();
  }


  public getServices(){

    this.service.getServicesList().subscribe(
    Response=>{
      this.ServiceModels=Response.success
      console.log(  this.ServiceModels[0].name);}
    )   
  }

}
