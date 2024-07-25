import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonModal, IonSelectOption, IonText, IonTitle, IonToolbar, IonLoading, LoadingController, IonCol, IonRow, IonFooter } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { InvitacionService } from 'src/app/services/invitacion.service';
import { FondoOlasComponent } from "../../components/fondo-olas/fondo-olas.component";
import { PaginaNoValidaComponent } from "../../components/pagina-no-valida/pagina-no-valida.component";
import { InvitacionConfirmadaComponent } from "../../components/invitacion-confirmada/invitacion-confirmada.component";
import { FormularioConfirmacionComponent } from "../../components/formulario-confirmacion/formulario-confirmacion.component";
@Component({
  selector: 'app-confirmacion-invitacion',
  templateUrl: './confirmacion-invitacion.page.html',
  styleUrls: ['./confirmacion-invitacion.page.scss'],
  standalone: true,
  imports: [IonFooter, IonRow, IonCol, IonLoading, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonButton, IonModal, IonItem, IonLabel, IonSelectOption, IonText, FondoOlasComponent, PaginaNoValidaComponent, InvitacionConfirmadaComponent, FormularioConfirmacionComponent]
})
export class ConfirmacionInvitacionPage implements OnInit {
  uuid: string = "";
  invitado: any;
  pases:any = null;
  error:boolean = false;
  isLoadingOpen: boolean = true;
  mensajeError:string = "";
  constructor(private route: ActivatedRoute, private invitacionService: InvitacionService, private loadingCtrl:LoadingController) { }

  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.uuid = params['id'];
      this.obtenerInvitado();
    });

  }
  obtenerInvitado() {
    this.isLoadingOpen = true;
    this.invitacionService.getInvitado(this.uuid).subscribe({
      next:(r) =>{
        this.invitado = r;
        console.log(r);
        this.isLoadingOpen = false;
        this.obtenerPases();
      },
      error: (e) =>{
        console.log(e.error);
        if(e.status ==  404){
          console.log("Servidor no encontrado");
          this.mensajeError = "Error de conexion"
        }
        this.error = true;
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

  


}
