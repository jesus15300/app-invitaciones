import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IInvitacion } from 'src/app/interfaces/iinvitacion';
import { InvitacionService } from 'src/app/services/invitacion.service';

@Component({
  selector: 'app-rechazo-invitacion',
  templateUrl: './rechazo-invitacion.component.html',
  styleUrls: ['./rechazo-invitacion.component.scss'],
  standalone:true,
  imports:[CommonModule]
})
export class RechazoInvitacionComponent  implements OnInit {
  @Input()
  invitado:IInvitacion | null=null;

  constructor(private invitacionService:InvitacionService) { }

  ngOnInit() {
    //this.cancelarInvitacion();
  }

  cancelarInvitacion(){
    if(this.invitado?.rechazada) return;
    this.invitacionService.rechazarInvitacion(this.invitado?.uuid).subscribe({
      next: (r) => {
        console.log("Respuesta de la api: ", r);
        location.reload();
      }, error: (e) => {

        console.log("Error al enviar los datos: ", e);
      }
    })
  }
}
