import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { ServiceModel } from 'src/app/models/service.model';
import Swal from 'sweetalert2';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { MatDialog } from '@angular/material/dialog';

@Component( {
  selector: 'app-service-list-admin',
  templateUrl: './service-list-admin.component.html',
  styleUrls: [ './service-list-admin.component.scss' ]
} )
export class ServiceListAdminComponent implements OnInit {

  public adminService: FormGroup;
  public serviceModels: ServiceModel[];

  constructor( private builder: FormBuilder,
               private service: ServiceService,
               public dialogo: MatDialog ) {

  }

  ngOnInit() {
    this.getServices();
    var ServiceModels = new ServiceModels();
  }


  public getServices(): void {
    this.service.getServicesList().subscribe(
      Response => {
        this.serviceModels = Response.success
      }
    );
  }

  public deleteService( id: number ): void {
    const t = this;
    this.service.deleteService( { id } ).subscribe(
      Response => {
        Swal.fire( {
          title: 'Eliminacion Exitosa',
          text: 'Has eliminado correctamente el servicio.',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Continuar',
          allowOutsideClick: false,
          preConfirm( inputValue: any ): any {
            t.getServices();
            return null;
          },
        } );

      } );
  }

  public openDialogEdit( service: ServiceModel ): void {
    const dialogoref = this.dialogo.open( EditServiceComponent, {
      width: '500px'
    } );

    dialogoref.afterClosed().subscribe( res => {
      console.log( res );
    } );
  }
}
