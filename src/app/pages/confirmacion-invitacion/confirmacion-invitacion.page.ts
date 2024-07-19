import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonModal, IonSelectOption, IonText, IonTitle, IonToolbar, IonLoading, LoadingController } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { InvitacionService } from 'src/app/services/invitacion.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-confirmacion-invitacion',
  templateUrl: './confirmacion-invitacion.page.html',
  styleUrls: ['./confirmacion-invitacion.page.scss'],
  standalone: true,
  imports: [IonLoading, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonModal, IonItem, IonLabel, IonSelectOption, IonText, ReactiveFormsModule, FormsModule]
})
export class ConfirmacionInvitacionPage implements OnInit {
  uuid: string = "";
  invitado: any;
  numAcompanantes: number = -1;
  showModal: boolean = false;
  public ionicForm: FormGroup;
  isLoadingOpen: boolean = false;
  constructor(private route: ActivatedRoute, private invitacionService: InvitacionService, public formBuilder: FormBuilder, private loadingCtrl:LoadingController) { 
      this.ionicForm = this.formBuilder.group({
        acompanantesExtra: [0, Validators.required],
        id:[this.uuid]
      });

    }

  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.uuid = params['id'];
      this.obtenerInvitado();

    });

  }
  obtenerInvitado() {
    this.invitacionService.getInvitado(this.uuid).subscribe(data => {
      this.invitado = data;
      console.log(data);
      
    });
  }

  confirmarAsistencia() {
    this.isLoadingOpen = true;
    this.invitacionService.confirmarAsistencia(this.uuid, this.numAcompanantes).subscribe({
      next: (r) => {
        this.isLoadingOpen = false;
        console.log("Respuesta de la api: ", r);
        location.reload();
      }, error: (e) => {
        console.log("Error al enviar los datos: ", e);
      }
    });
  }
  handleChange(e:any) {
    console.log('ionChange fired with value: ' + e.detail.value);
    this.numAcompanantes = e.detail.value;
  }
  cerrarModal() {
    this.showModal = false;
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Dismissing after 3 seconds...',
    });

    loading.present();
  }
}
