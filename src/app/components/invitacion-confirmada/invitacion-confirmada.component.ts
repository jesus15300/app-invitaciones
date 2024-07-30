import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonCol, IonRow } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-invitacion-confirmada',
  templateUrl: './invitacion-confirmada.component.html',
  styleUrls: ['./invitacion-confirmada.component.scss'],
  standalone:true,
  imports:[IonRow, IonCol, CommonModule]
})
export class InvitacionConfirmadaComponent  implements OnInit {
  @Input()
  invitado:any = null;
  @Input()
  pases:any=null;
  apiUrl = environment.apiUrl;
  constructor() { }

  ngOnInit() {
    console.log("%c2024 Club Alpha. Desarrollado por Ing. Jesus E. Salgado L.",
    "background-color: blue; color: #ffffff ; font-weight: bold ; padding: 4px ; font-size: 20px;");
  }

}
