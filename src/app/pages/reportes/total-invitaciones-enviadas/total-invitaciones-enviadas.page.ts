import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonSelectOption, IonSelect, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonCol, IonRow } from '@ionic/angular/standalone';
import { FondoOlasComponent } from 'src/app/components/fondo-olas/fondo-olas.component';
import { InvitacionService } from 'src/app/services/invitacion.service';
import { IInvitacion } from 'src/app/interfaces/iinvitacion';

@Component({
  selector: 'app-total-invitaciones-enviadas',
  templateUrl: './total-invitaciones-enviadas.page.html',
  styleUrls: ['./total-invitaciones-enviadas.page.scss'],
  standalone: true,
  imports: [CommonModule, IonCol, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, FondoOlasComponent, IonRow, IonList, IonItem, IonSelect, IonSelectOption]
})
export class TotalInvitacionesEnviadasPage implements OnInit {
  datos: any = undefined;
  datosAux: any = undefined;
  isLoadingOpen: boolean = false;
  tipoPases = [
    {
      name: 'Todos',
      selected: true
    }
  ];
  tipoEstados = [
    {
      name: 'Todos',
      selected: true
    },{
      name: 'Aceptada',
      selected: true
    },{
      name: 'Rechazada',
      selected: true
    },{
      name: 'Invitacion enviada',
      selected: true
    }
  ];
  tipoClasificaciones = [{name:'Todos', selected:true}];
  constructor(private invitacionService: InvitacionService) { }

  ngOnInit() {
    this.invitacionService.getTotalInvitados().subscribe({
      next:(r) =>{
        this.datos = r;
        this.datos = this.datos.filter((dato: any) => dato.tipoPases != 'Vip');
        this.datosAux = this.datos;

        const pases = this.datosAux.map((dato: any) => ({name: dato.tipoPases.trim(), selected:false}));
        this.tipoPases = this.tipoPases.concat(pases);
        this.tipoPases = this.tipoPases.filter((obj:any, index:any, self:any) =>
          index === self.findIndex((t:any) => (
            t.name === obj.name
          ))
        );

        const clasificaciones = this.datosAux.map((dato: any) => ({name: dato.clasificacion.trim(), selected:false}))
        this.tipoClasificaciones = this.tipoClasificaciones.concat(clasificaciones);
        //console.log('clasificaciones concatenadas: ', this.tipoClasificaciones);
         this.tipoClasificaciones = this.tipoClasificaciones.filter((obj:any, index:any, self:any) =>
          index === self.findIndex((t:any) => (
            t.name === obj.name
          ))
        );

        //console.log(r);
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
  estadoInvitacionString(invitacion: IInvitacion) {
    if (invitacion.aceptada) {
      return "Aceptada"
    } else if (invitacion.rechazada) {
      return "Rechazada"
    }
    return "Invitacion enviada";
  }
  estadoInvitacionClass(invitacion: IInvitacion) {
    if (invitacion.aceptada) {
      return "aceptada"
    } else if (invitacion.rechazada) {
      return "rechazada"
    }
    return "";
  }
  handleEstadoFilter(ev: any) {
    //console.log(JSON.stringify(ev.target.value));
    this.tipoEstados.forEach(e => e.selected = false);
    
    this.tipoEstados.filter(e => e.name == ev.target.value)[0].selected = true;
    
    this.filterList();
    
    
    
  }
  
  handleClasificacionFilter(ev: any) {
    console.log('Clasificacion seleccionada: ',JSON.stringify(ev.target.value));
    this.tipoClasificaciones.forEach(e => e.selected = false);
    
    this.tipoClasificaciones.filter(e => e.name == ev.target.value)[0].selected = true;
    
    this.filterList();
    
    
    
  }
  handleInvitadoFilter(ev: any) {
    //console.log(JSON.stringify(ev.target.value));
    this.tipoPases.forEach(e => e.selected = false);

    this.tipoPases.filter(e => e.name == ev.target.value)[0].selected = true;

    this.filterList();
    
  }
  filterList() {
    /*filtramos la lista por estado*/
    const estadoSeleccionado = this.tipoEstados.find(e => e.selected == true);
    //console.log(estadoSeleccionado);
    
    this.datosAux = this.datos;
    switch (estadoSeleccionado?.name) {
      case "Todos":
        break;
      case "Aceptada":
        this.datosAux = this.datos.filter((dato: any) => dato.aceptada == true);
        break;
      case 'Rechazada':
        this.datosAux = this.datos.filter((dato: any) => dato.rechazada == true);
        break;
      case 'Invitacion enviada':
        this.datosAux = this.datos.filter((dato: any) => dato.aceptada == false && dato.rechazada == false);
        break;
    }

    /*filtramos por tipo Invitado*/
    //console.log(this.tipoPases);
    
    const pasesSeleccionado = this.tipoPases.find(e => e.selected == true);
    //console.log(pasesSeleccionado);
    
    if (pasesSeleccionado?.name != "Todos") {
      this.datosAux = this.datosAux.filter((dato: any) => dato.tipoPases == pasesSeleccionado?.name);
    }
    
    /*Filtramos por tipo de clasificacion*/
    const clasificacionSeleccionada = this.tipoClasificaciones.find(e => e.selected == true);
    console.log(clasificacionSeleccionada);
    
    if(clasificacionSeleccionada?.name != "Todos"){
      this.datosAux = this.datosAux.filter((dato: any) => dato.clasificacion.trim() == clasificacionSeleccionada?.name.trim());

    }
  }
}
