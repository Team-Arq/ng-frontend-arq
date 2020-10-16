import { Component, OnInit, inject, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { from } from 'rxjs';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent implements OnInit {


  //atributos
  constructor(
    public dialogoEdicion: MatDialogRef<EditServiceComponent>,
 /*   @Inject(MAT_DIALOG_DATA);*/
  ) { }

  ngOnInit(): void {
  }


  onClickEditar():void{
this.dialogoEdicion.close();
  }
}
