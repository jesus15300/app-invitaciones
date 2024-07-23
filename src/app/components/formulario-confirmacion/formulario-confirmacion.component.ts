import { Component, Input, OnInit } from '@angular/core';
import { IonButton, IonItem, IonLabel, IonLoading, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { InvitacionService } from 'src/app/services/invitacion.service';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-confirmacion',
  templateUrl: './formulario-confirmacion.component.html',
  styleUrls: ['./formulario-confirmacion.component.scss'],
  standalone:true,
  imports:[IonItem, IonLabel, IonSelect, IonSelectOption, IonButton ,FormsModule, ReactiveFormsModule, IonLoading, CommonModule]
})
export class FormularioConfirmacionComponent  implements OnInit {
  @Input()
  invitado:any = null;
  @Input()
  uuid:string = "";
  
  numAcompanantes: number = -1;
  public ionicForm: FormGroup;
  
  isLoadingSendingOpen:boolean = false;
  constructor(private formBuilder: FormBuilder, private invitacionService:InvitacionService) {
    this.ionicForm = this.formBuilder.group({
      acompanantesExtra: [ Validators.required],
      id:[this.uuid]
    });
   }

  ngOnInit() {}

  handleOptionChange(e:any) {
    console.log('ionChange fired with value: ' + e.detail.value);
    this.numAcompanantes = e.detail.value;
  }
  confirmarAsistencia() {
    this.isLoadingSendingOpen = true;
    this.invitacionService.confirmarAsistencia(this.uuid, this.numAcompanantes).subscribe({
      next: (r) => {
        this.isLoadingSendingOpen = false;
        console.log("Respuesta de la api: ", r);
        this.numAcompanantes = -1;
        location.reload();
      }, error: (e) => {

        console.log("Error al enviar los datos: ", e);
        this.isLoadingSendingOpen = false;
      }
    });
  }
}
