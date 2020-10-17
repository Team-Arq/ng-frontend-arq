import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../include/form.utils';
import Swal from 'sweetalert2';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-type-service',
  templateUrl: './type-service.component.html',
  styleUrls: ['./type-service.component.scss']
})
export class TypeServiceComponent implements OnInit {

  //atributos
  public createTypeService: FormGroup;
  public loading = false;

  //constructor
  constructor(
    private builder: FormBuilder,
    private service: ServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Setting register form
    this.createTypeService = this.builder.group(
      {
        name: [{ value: '', disabled: false }, [Validators.required]],
        description: [{ value: '', disabled: false }, [Validators.required]],
      },
      [FormUtils.validator]
    );
  }
  public doCreate(): void {
    // Validate form
    if (this.createTypeService.invalid) {
      this.createTypeService.markAllAsTouched();
      return;
    }

    this.loading = true;
    
    // Do register service
    this.service
      .createServiceType({
        nameTypeService: this.createTypeService.get('name').value,
        description: this.createTypeService.get('description').value,
      })
      .subscribe(
        (response) => {
          const t = this;
          this.loading = false;

          Swal.fire({
            title: 'Tipo de servicio creado',
            text: 'Has creado correctamente el tipo servicio.',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Continuar',
            allowOutsideClick: false,
            preConfirm(inputValue: any): any {
              t.router.navigate(['','admin','service','registration' ]);
              return null;
            },
          });
        },
        (error) => {
          this.loading = false;
          Swal.fire({
            title: 'Lo sentimos ',
            text: error.error.message || error.message,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'Aceptar',
          });
        }
      );
  }

}
