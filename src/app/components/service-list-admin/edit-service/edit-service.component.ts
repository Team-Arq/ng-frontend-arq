import { Component, OnInit, inject, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../../include/form.utils';
import { ServiceService } from '../../../services/service.service';
import { ServiceTypeModel } from 'src/app/models/serviceType.models';
import { ServiceModel } from 'src/app/models/service.model';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})

export class EditServiceComponent implements OnInit {

 //atributos
 public editServiceform: FormGroup;
 public loading = false;
 public serviceTypes: ServiceTypeModel[];


  constructor(
    public dialogoEdicion: MatDialogRef<EditServiceComponent>,
    private builder: FormBuilder,
    private service: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data: ServiceModel
  ) { }

  

  ngOnInit(): void {

    this.editServiceform = this.builder.group(
      {
        typeService: [{ value: '', disabled: false }, [Validators.required]],
        price: [{ value: '', disabled: false }, [Validators.required]],
        description: [{ value: '', disabled: false }, [Validators.required]],
      },
      [FormUtils.validator]
    );
    this.getTypesService();

    console.log(this.data);

  }

  onClickEditar():void{
    console.log('asdkasdkasldaskdlskadlaskdlpasmdao´kdnawip');
      this.dialogoEdicion.close();
  }



  public getTypesService():void{
    this.service.getServiceType().subscribe(
    Response=>{
      this.serviceTypes=Response.success
    }
    );}


    public editService(): void {

      console.log(this.editServiceform.get('typeService').value);
      console.log( this.editServiceform.get('description').value);
   
     // Validate form
      if (this.editServiceform.invalid) {
        this.editServiceform.markAllAsTouched();
        console.log('Error');
        return;
      }
  
      this.loading = true;

  
      this.service.editService({
          idService:this.data.id,
          typeService: this.editServiceform.get('typeService').value,
          description: this.editServiceform.get('description').value,
          price: this.editServiceform.get('price').value,
        })
        .subscribe(
          (response) => {
            const t = this;
            this.loading = false;

            
      console.log( this.editServiceform.get('description').value);
  
            Swal.fire({
              title: 'Registro Exitoso',
              text: 'Has editado correctamente el servicio.',
              icon: 'success',
              showCancelButton: false,
              confirmButtonText: 'Continuar',
              allowOutsideClick: false,
              preConfirm(inputValue: any): any {
                return null;
              },
            });
          },
          (error) => {
            this.loading = false;
            Swal.fire({
              title: 'Lo sentimos la edicion no fue correcta',
              text: error.error.message || error.message,
              icon: 'error',
              showCancelButton: false,
              confirmButtonText: 'Aceptar',
            });
          }
        );
    }

}
