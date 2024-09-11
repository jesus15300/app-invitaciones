import { CheckinService } from './../../services/checkin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonItem, IonLabel, IonIcon, IonButton, IonModal, IonCol, IonText, IonRow, IonTabButton, IonAlert, IonButtons, IonSearchbar, IonList, IonLoading } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkbox, list, scan } from 'ionicons/icons';
import { InvitacionService } from 'src/app/services/invitacion.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
  standalone: true,
  imports: [IonList, IonSearchbar, IonLoading, IonSearchbar, IonButtons, IonAlert, IonTabButton, IonRow, IonText, IonCol, IonModal, IonButton, IonIcon, IonLabel, IonItem, IonSegmentButton, IonSegment, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  providers: []
})

export class EventoPage implements OnInit {
  datos: any = undefined;
  isLoadingOpen: boolean = false;
  mensajeError:String = "";
  selectTabs = 'lista';
  modalController: any;
  tpase = '';


  qrCode: string = '';
  scannedData: any = null;

  constructor( private invitacionService: InvitacionService, private checkinService:CheckinService) {
    addIcons({ list, scan, checkbox});
  }

  ngOnInit() {
    this.tpase = environment.invitados;
    this.isLoadingOpen = true;
    this.ObtenerInvitados();
    console.log("%c2024 Club Alpha. Desarrollado por Ing. Jesus E. Salgado L.",
      "background-color: blue; color: #ffffff ; font-weight: bold ; padding: 4px ; font-size: 20px;");
  }

  private ObtenerInvitados() {
    this.checkinService.getListaInvitadosCheckin().subscribe({
      next: (r) => {
        this.datos = r;
        console.log(r);
        this.isLoadingOpen = false;
      },
      error: (e) => {
        console.log(e.error);
        if (e.status === 404) {
          console.log("Servidor no encontrado");
        }
        this.isLoadingOpen = false;

      }
    });
  }

  estado(acep: boolean, rech: boolean): string {
    if (acep && !rech) {
      return 'Aceptada';
    } else if (!acep && rech) {
      return 'Rechazada';
    } else if(!acep && !rech){
      return 'Invitación Enviada';
    } else {
      return 'Todos';
    }
  }

  onCheckinManualClick(invitadoId:String, idPase:Number){
    this.openModal();
    this.scannedData = null;
    this.isLoadingOpen = true;
    this.mensajeError = "";

    this.checkinService.getInvitadoCheckin(invitadoId, idPase).subscribe({
      next: (r) =>{
        this.scannedData = r;
        console.log(this.scannedData);
        this.isLoadingOpen = false

      },
      error: (e)=>{
        if(e.status === 404){
          console.log("error de servidor");
          this.mensajeError = e.error.mensaje;
        }
        this.isLoadingOpen = false;
      }
    })
  }
  async openModal(){
    const modalElement = document.querySelector('ion-modal#modal-lista');

    if(modalElement) await (modalElement as any).present();
  }
  onSearchChange(event:any){
    console.log(event.target.value);

  }
  // cargarQR() {
  //   const opciones = {
  //     preferFrontCamera: false, // iOS and Android
  //     showFlipCameraButton: false, // iOS and Android
  //     showTorchButton: false, // iOS and Android
  //     torchOn: false, // Android, launch with the torch switched on (if available)
  //     saveHistory: true, // Android, save scan history (default false)
  //     prompt: "Escanea un QR de Pases J500", // Android
  //     resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
  //     orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
  //     disableAnimations: false, // iOS
  //     disableSuccessBeep: false // iOS and Android
  //   };
  //   this.barcodeScanner.scan(opciones).then(barcodeData => {
  //     const codigo = barcodeData.text.split("-");
  //     if (codigo[0] === 'PESAJE') {
  //       // this.rutinasService.activarBascula(Number(codigo[1]), Number(this.tokenService.getUserName())).subscribe(data => {
  //       //   console.log('Envió de pesaje: ', data);
  //       // });
  //     }
  //     console.log('Barcode data', barcodeData);
  //   }).catch(err => {
  //     console.log('Error', err);
  //   });
  // }
}
