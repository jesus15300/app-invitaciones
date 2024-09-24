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
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-evento-aq',
  templateUrl: './evento-aq.page.html',
  styleUrls: ['./evento-aq.page.scss'],
  standalone: true,
  imports: [IonList, ZXingScannerModule, IonSearchbar, IonToast, IonLoading, IonSearchbar, IonButtons, IonAlert, IonTabButton, IonRow, IonText, IonCol, IonModal, IonButton, IonIcon, IonLabel, IonItem, IonSegmentButton, IonSegment, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  providers: []
})
export class EventoAqPage implements OnInit {
  datos: any = undefined;
  datosAux:any = undefined;
  isLoadingOpen: boolean = false;
  isToastTableOpen:boolean = false;
  currentSearchText = "";
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
      console.log('parametros: ',params);
      this.tipoLista = params['tipo-lista'];
      this.isLoadingOpen = true;
    this.ObtenerInvitados();
    var interval = setInterval(() => {
      console.log("Set interval");
      
      this.ObtenerInvitados();
    }, 20000);
    });
    this.isLoadingOpen = true;
    
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
        //this.datos = this.datos.filter((dato:any) => dato.tipopases != "Vip");

        if(this.tipoLista == 'internos'){
          this.datos = this.datos.filter((dato:any) => dato.tipopases == "Vip");
        }
        else if(this.tipoLista == 'general'){
          this.datos = this.datos.filter((dato:any) => dato.tipopases != "Vip");
        }
        else{
          this.datos = null;
        }

        /* Lo guardamos en la variable auxiliar */
        this.datosAux = this.datos;
        if(this.currentSearchText !== ""){
          this.datosAux = this.datos.filter((dato:any) => dato.nombrecompleto.toLowerCase().includes(this.currentSearchText))
        }
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

  async onCheckinManualClick(invitadoId:String, idPase:Number | null){
    this.scannedData = null;
    this.isLoadingOpen = true;
    this.mensajeError = "";
    this.ObtenerInvitados();

    this.getInvitadoCheckin(invitadoId, idPase);
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
    this.currentSearchText = event.target.value.toLowerCase();
    //console.log(text);
    if(this.currentSearchText == "") {
      this.datosAux = this.datos;
      return;
    }
    this.datosAux = this.datos.filter((dato:any) => dato.nombrecompleto.toLowerCase().includes(this.currentSearchText))
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
    this.currentSearchText = "";
      return;
  }
  scanSuccessHandler(evento:any){
    
    console.log(evento);
    this.closeModal("modal-lector");
    let uuid = "";
    let idPase = -1;
    if(evento.includes(';')){
      uuid = evento.split(';')[0];
      idPase = evento.split(';')[1];
    }
    if(uuid == ""){
      console.log('qr no valido');
      this.mensajeError = "qr no valido: " + evento;
      this.openModal("modal-e");
      return;
    }
    this.scannedData = null;
    this.isLoadingOpen = true;
    this.mensajeError = "";
    this.getInvitadoCheckin(uuid, idPase);
  }
  private getInvitadoCheckin(uuid: String, idPase: Number | null) {
    this.checkinService.getInvitadoCheckin(uuid, idPase).subscribe({
      next: (r) => {
        this.scannedData = r;
        //console.log(this.scannedData);
        this.isLoadingOpen = false;
        this.openModal("modal-datos");

      },
      error: (e) => {
        if (e.status === 404) {
          console.log("error de servidor");
          this.mensajeError = e.error.mensaje;
        }
        if (e.error.mensaje) {
          console.log("mensaje del servidor", e.error.mensaje);
          this.mensajeError = e.error.mensaje;
        }
        this.openModal("modal-e");
        this.isLoadingOpen = false;
      }
    });
  }

  onSegmentChange(event:any){
    console.log(event.detail.value);
    if(event.detail.value == 'lista'){
      this.currentSearchText = "";
      this.ObtenerInvitados();
    }
  }
}
