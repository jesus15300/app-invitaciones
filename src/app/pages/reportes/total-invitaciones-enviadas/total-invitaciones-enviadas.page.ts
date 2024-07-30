import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonCol, IonRow } from '@ionic/angular/standalone';
import { FondoOlasComponent } from 'src/app/components/fondo-olas/fondo-olas.component';
import { InvitacionService } from 'src/app/services/invitacion.service';

@Component({
  selector: 'app-total-invitaciones-enviadas',
  templateUrl: './total-invitaciones-enviadas.page.html',
  styleUrls: ['./total-invitaciones-enviadas.page.scss'],
  standalone: true,
  imports: [CommonModule,IonCol, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, FondoOlasComponent, IonRow]
})
export class TotalInvitacionesEnviadasPage implements OnInit {
  datos:any = undefined;
  isLoadingOpen:boolean = false;
  constructor(private invitacionService:InvitacionService) { }

  ngOnInit() {
    this.invitacionService.getTotalInvitados().subscribe({
      next:(r) =>{
        this.datos = r;
        console.log(r);
        this.isLoadingOpen = false;
      },
      error: (e) =>{
        console.log(e.error);
        if(e.status ==  404){
          console.log("Servidor no encontrado");
        }
        this.isLoadingOpen = false;
      }
    });
    console.log("%c2024 Club Alpha. Desarrollado por Ing. Jesus E. Salgado L.",
    "background-color: blue; color: #ffffff ; font-weight: bold ; padding: 4px ; font-size: 20px;");
  }
  booleanString(val:boolean){
    if(val){
      return 'Si'
    }
    else
      return 'No'
  }
}
