import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonCol, IonRow } from '@ionic/angular/standalone';

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
  constructor() { }

  ngOnInit() {}

}
