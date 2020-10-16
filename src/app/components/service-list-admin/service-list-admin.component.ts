import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../include/form.utils';
import { ServiceService } from '../../services/service.service';
import { ServiceModel } from 'src/app/models/service.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; 
import {EditServiceComponent} from '../service-list-admin/edit-service/edit-service.component'
import { from } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-service-list-admin',
  templateUrl: './service-list-admin.component.html',
  styleUrls: ['./service-list-admin.component.scss']
})
export class ServiceListAdminComponent implements OnInit {

  //atributos
  public adminService: FormGroup;
  public serviceModels: ServiceModel[];
 
  constructor(   private builder: FormBuilder,
    private service: ServiceService,
    public dialogo: MatDialog) {
    
   }

  ngOnInit() {
    this.getServices();
    var ServiceModels = new ServiceModels();
  }


  public getServices(){
    this.service.getServicesList().subscribe(
    Response=>{
      this.serviceModels=Response.success}
    )   
  }

  public deleteService(id:number ){
    const t=this;
    this.service.deleteService({id}).subscribe(
      Response=>{
        const t = this;
        Swal.fire({
          title: 'Eliminacion Exitosa',
          text: 'Has eliminado correctamente el servicio.',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Continuar',
          allowOutsideClick: false,
          preConfirm(inputValue: any): any {
            t.getServices();
            return null;
          },
        });

      }
    )
  }

public openDialogEdit(service:ServiceModel){
  console.log("holaaa");
const dialogoref = this.dialogo.open(EditServiceComponent,{});
dialogoref.afterClosed().subscribe(res=>{
  console.log(res);
})
}

}
