import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../include/form.utils';
import Swal from 'sweetalert2';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { ServiceTypeModel } from 'src/app/models/serviceType.models';


@Component({
  selector: 'app-service-registration',
  templateUrl: './service-registration.component.html',
  styleUrls: ['./service-registration.component.scss'],
})
export class ServiceRegistrationComponent implements OnInit {

  //atributos
  public registerService: FormGroup;
  public loading = false;
  public serviceTypes: ServiceTypeModel[];

  //constructor
  constructor(
    private builder: FormBuilder,
    private service: ServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Setting register form
    this.registerService = this.builder.group(
      {
        name: [{ value: '', disabled: false }, [Validators.required]],
        tipoServicio: [{ value: '', disabled: false }, [Validators.required]],
        price: [{ value: '', disabled: false }, [Validators.required]],
        description: [{ value: '', disabled: false }, [Validators.required]],
      },
      [FormUtils.validator]
    );

    this.getTypesService();
  }

  public doRegister(): void {
    // Validate form
    if (this.registerService.invalid) {
      this.registerService.markAllAsTouched();
      return;
    }

    this.loading = true;
    
    // Do register service
    this.service
      .registerService({
        name: this.registerService.get('name').value,
        typeService: this.registerService.get('tipoServicio').value,
        description: this.registerService.get('description').value,
        price: this.registerService.get('price').value,
      })
      .subscribe(
        (response) => {
          const t = this;
          this.loading = false;

          Swal.fire({
            title: 'Registro Exitoso',
            text: 'Has registrado correctamente el servicio.',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Continuar',
            allowOutsideClick: false,
            preConfirm(inputValue: any): any {
              t.router.navigate(['', '', '']);
              return null;
            },
          });
        },
        (error) => {
          this.loading = false;
          Swal.fire({
            title: 'Lo sentimos el servicio no fue registrado correctamente',
            text: error.error.message || error.message,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'Aceptar',
          });
        }
      );
  }

  public getTypesService():void{
this.service.getServiceType().subscribe(
Response=>{
  this.serviceTypes=Response.success
}
);
  }

}
