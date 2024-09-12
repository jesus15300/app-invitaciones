import { CheckinService } from './../../services/checkin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonToast, IonContent, IonHeader, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonItem, IonLabel, IonIcon, IonButton, IonModal, IonCol, IonText, IonRow, IonTabButton, IonAlert, IonButtons, IonSearchbar, IonList, IonLoading } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkbox, checkmarkCircleOutline, list, scan } from 'ionicons/icons';
import { InvitacionService } from 'src/app/services/invitacion.service';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
  standalone: true,
  imports: [IonList, IonSearchbar, IonToast, IonLoading, IonSearchbar, IonButtons, IonAlert, IonTabButton, IonRow, IonText, IonCol, IonModal, IonButton, IonIcon, IonLabel, IonItem, IonSegmentButton, IonSegment, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  providers: []
})

export class EventoPage implements OnInit {
  datos: any = undefined;
  datosAux:any = undefined;
  isLoadingOpen: boolean = false;
  isToastTableOpen:boolean = false;
  mensajeError:String = "";
  selectTabs = 'lista';
  tipoLista:any = undefined;
  modalController: any;
  tpase = '';


  qrCode: string = '';
  scannedData: any = null;

  constructor( private invitacionService: InvitacionService, private checkinService:CheckinService, private route:ActivatedRoute) {
    addIcons({ list, scan, checkmarkCircleOutline});
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.tipoLista = params['tipo-lista'];
      this.isLoadingOpen = true;
    this.ObtenerInvitados();
    });
    this.isLoadingOpen = true;
    this.ObtenerInvitados();
    console.log("%c2024 Club Alpha. Desarrollado por Ing. Jesus E. Salgado L.",
      "background-color: blue; color: #ffffff ; font-weight: bold ; padding: 4px ; font-size: 20px;");
  }

 async ObtenerInvitados() {
    if(this.isToastTableOpen){
      return;
    }
    this.isToastTableOpen = true;
    this.checkinService.getListaInvitadosCheckin().subscribe({
      next: (r) => {
        this.datos = r;
        this.datos = this.datos.filter((dato:any) => dato.tipopases != "Vip");

        if(this.tipoLista == 'vip'){
          this.datos = this.datos.filter((dato:any) => dato.tipopases == "VIP" || dato.tipopases == "Inv. Especial");
        }
        else if(this.tipoLista = 'j500'){
          this.datos = this.datos.filter((dato:any) => dato.tipopases == "J500");
        }
        else{
          this.datos = null;
        }
        /* Lo guardamos en la variable auxiliar */
        this.datosAux = this.datos;
        //console.log(r);
        this.isLoadingOpen = false;
        this.isToastTableOpen = false;
      },
      error: (e) => {
        console.log(e.error);
        if (e.status === 404) {
          console.log("Servidor no encontrado");
        }
        this.isLoadingOpen = false;
        this.isToastTableOpen = false;
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

  async onCheckinManualClick(invitadoId:String, idPase:Number){
    this.scannedData = null;
    this.isLoadingOpen = true;
    this.mensajeError = "";
    this.ObtenerInvitados();

    this.checkinService.getInvitadoCheckin(invitadoId, idPase).subscribe({
      next: (r) =>{
        this.scannedData = r;
        //console.log(this.scannedData);
        this.isLoadingOpen = false
        this.openModal("modal-datos");
        
      },
      error: (e)=>{
        if(e.status === 404){
          console.log("error de servidor");
          this.mensajeError = e.error.mensaje;
        }
        if(e.error.mensaje){
          console.log("mensaje del servidor", e.error.mensaje);
          this.mensajeError = e.error.mensaje;
        }
        this.openModal("modal-e");
        this.isLoadingOpen = false;
      }
    })
  }
  async openModal(id:any){
    const modalElement = document.querySelector('ion-modal#'+id);

    if(modalElement) await (modalElement as any).present();
  }  
  async closeModal(id:any){
    const modalElement = document.querySelector('ion-modal#'+id);

    if(modalElement) await (modalElement as any).dismiss();
  }
  onSearchChange(event:any){
    const text = event.target.value.toLowerCase();
    //console.log(text);
    if(text == "") {
      this.datosAux = this.datos;
      return;
    }
    this.datosAux = this.datos.filter((dato:any) => dato.nombrecompleto.toLowerCase().includes(text))
  }
  realizarCheckin(){
    //console.log(this.scannedData);
    this.isLoadingOpen = true;
    if(this.scannedData == null){

      return;
    }
    const invitadoId:any  = this.scannedData.invitado.uuid;
    const idPase:any  = this.scannedData.id;
    this.checkinService.postCheckin(invitadoId, idPase).subscribe({
      next: (r) =>{
        
        console.log("Checkin: ", r);
        this.isLoadingOpen = false
        this.ObtenerInvitados();
        this.closeModal("modal-datos");
        this.openModal("modal-c");
      },
      error: (e)=>{
        console.log("error", e);
        
        if(e.status === 404){
          console.log("error de servidor");
          this.mensajeError = e.error.mensaje;
        }
        if(e.error.mensaje){
          console.log("mensaje del servidor", e.error.mensaje);
          this.mensajeError = e.error.mensaje;
        }
        this.closeModal("modal-datos");
        this.openModal("modal-e");
        this.isLoadingOpen = false;
      }
    })
  }

  onClear(){
    this.datosAux = this.datos;
      return;
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
