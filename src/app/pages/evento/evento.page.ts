import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonItem, IonLabel, IonIcon, IonButton, IonModal, IonCol, IonText, IonRow, IonTabButton, IonAlert, IonButtons, IonSearchbar, IonList } from '@ionic/angular/standalone';
import { FondoOlasComponent } from 'src/app/components/fondo-olas/fondo-olas.component';
import { addIcons } from 'ionicons';
import { list, scan } from 'ionicons/icons';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { InvitacionService } from 'src/app/services/invitacion.service';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
  standalone: true,
  imports: [IonList, IonSearchbar, IonButtons, IonAlert, IonTabButton, IonRow, IonText, IonCol, IonModal, IonButton, IonIcon, IonLabel, IonItem, IonSegmentButton, IonSegment, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, FondoOlasComponent],
  providers: [BarcodeScanner]
})

export class EventoPage implements OnInit {
  datos: any = undefined;
  isLoadingOpen: boolean = false;
  selectTabs = 'lista';
  modalController: any;
  tpase = '';


  qrCode: string = '';
  scannedData: any = null;

  constructor(private barcodeScanner: BarcodeScanner, private invitacionService: InvitacionService) {
    addIcons({ list, scan});
  }

  ngOnInit() {
    this.tpase = environment.invitados;
    this.invitacionService.getTotalInvitados().subscribe({
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
    console.log("%c2024 Club Alpha. Desarrollado por Ing. Jesus E. Salgado L.",
      "background-color: blue; color: #ffffff ; font-weight: bold ; padding: 4px ; font-size: 20px;");
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

  //Método para lector QR
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.qrCode = barcodeData.text;
      this.scannedData = this.datos.find((item: { qrCode: string; }) => item.qrCode === this.qrCode);

      if(this.scannedData){
        console.log('Datos Escaneados: ', this.scannedData);
      } else{
        console.log('No se encontraron datos para el codigo QR escaneado');
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

  //Filtro de Datos en la Lista de invitados
  /*public alertButtons = ['OK'];
  public alertInputs = [
    {
      label: 'Red',
      type: 'radio',
      value: 'red',
    },
    {
      label: 'Blue',
      type: 'radio',
      value: 'blue',
    },
    {
      label: 'Green',
      type: 'radio',
      value: 'green',
    },
  ];*/
}
