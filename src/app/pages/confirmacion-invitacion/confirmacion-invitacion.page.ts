import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonModal, IonSelectOption, IonText, IonTitle, IonToolbar, IonLoading, LoadingController, IonCol, IonRow, IonFooter } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitacionService } from 'src/app/services/invitacion.service';
import { FondoOlasComponent } from "../../components/fondo-olas/fondo-olas.component";
import { PaginaNoValidaComponent } from "../../components/pagina-no-valida/pagina-no-valida.component";
import { InvitacionConfirmadaComponent } from "../../components/invitacion-confirmada/invitacion-confirmada.component";
import { FormularioConfirmacionComponent } from "../../components/formulario-confirmacion/formulario-confirmacion.component";
import { IInvitacion } from 'src/app/interfaces/iinvitacion';
import { RechazoInvitacionComponent } from 'src/app/components/rechazo-invitacion/rechazo-invitacion.component';
@Component({
  selector: 'app-confirmacion-invitacion',
  templateUrl: './confirmacion-invitacion.page.html',
  styleUrls: ['./confirmacion-invitacion.page.scss'],
  standalone: true,
  imports: [IonFooter, IonRow, IonCol, IonLoading, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonButton, IonModal, IonItem, IonLabel, IonSelectOption, IonText, FondoOlasComponent, PaginaNoValidaComponent, InvitacionConfirmadaComponent, FormularioConfirmacionComponent, RechazoInvitacionComponent]
})
export class ConfirmacionInvitacionPage implements OnInit {
  uuid: string = "";
  tipo: string = "";
  invitado: IInvitacion | null = null;
  pases:any = null;
  error:boolean = false;
  isLoadingOpen: boolean = false;
  mensajeError:string = "";
  constructor(private router:Router,private route: ActivatedRoute, private invitacionService: InvitacionService, private loadingCtrl:LoadingController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.uuid = params['id'];
      this.tipo = params['tipo'];
      this.obtenerInvitado();
    });
    console.log("%c2024 Club Alpha. Desarrollado por Ing. Jesus E. Salgado L.",
    "background-color: blue; color: #ffffff ; font-weight: bold ; padding: 4px ; font-size: 20px;");
  }
  obtenerInvitado() {
    this.isLoadingOpen = true;
    console.log('confirmar',this.uuid);
    if(this.uuid == undefined || this.uuid === '' || this.tipo === undefined || this.tipo === ''){
      this.isLoadingOpen = false;
      this.error = true;
      return
    }
    this.invitacionService.getInvitado(this.uuid).subscribe({
      next:(r) =>{
        this.invitado = r;
        console.log('confirma',r);
        this.isLoadingOpen = false;
        console.log(this.tipo);
        
        if(this.tipo == '1'){
          this.rechazarInvitacion();
        }
        this.obtenerPases();
      },
      error: (e) =>{
        console.log(e.error);
        this.error = true;
        if(e.error instanceof ProgressEvent){
          this.mensajeError = 'Error de conexión por favor intenta mas tarde'
        }
        if(e.status ==  404){
          console.log("Servidor no encontrado");
          this.mensajeError = "Error de conexión"
        }
        if(e.status ==  400){
          console.log("Servidor no encontrado");
          this.mensajeError = "Enlace no valido o expirado"
        }
        this.isLoadingOpen = false;
      }
    });
  }

  obtenerPases(){
    this.invitacionService.getPases(this.uuid).subscribe({
      next:(r) =>{
        this.pases = r;
        console.log(r);
      },
      error: (e) =>{
        console.log(e);
      }
    });
  }
  rechazarInvitacion(){
    this.invitacionService.rechazarInvitacion(this.uuid).subscribe({
      next:(r) =>{
        console.log(r);
        this.isLoadingOpen = false;
      },
      error: (e) =>{
        console.log(e);
        this.isLoadingOpen = false;
      }
    });
  }
}
