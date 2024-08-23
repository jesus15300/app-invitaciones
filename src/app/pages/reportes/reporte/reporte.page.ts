import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCol, IonRow, IonText, IonFooter } from '@ionic/angular/standalone';
import { BarChartComponent } from "../../../components/bar-chart/bar-chart.component";
import { PieChartComponent } from "../../../components/pie-chart/pie-chart.component";
import { StackedHorizontalChartComponent } from "../../../components/stacked-horizontal-chart/stacked-horizontal-chart.component";
import { InvitacionService } from 'src/app/services/invitacion.service';
import { FondoOlasComponent } from 'src/app/components/fondo-olas/fondo-olas.component';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss'],
  standalone: true,
  imports: [IonFooter,IonText, IonCol, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, BarChartComponent, PieChartComponent, StackedHorizontalChartComponent, IonRow, FondoOlasComponent]
})
export class ReportePage implements OnInit {
  datosReporte:any = null;
  constructor(private invitacionService:InvitacionService) { }

  ngOnInit() {
    this.invitacionService.getReporte().subscribe({
      next:(r) =>{
        this.datosReporte = r;
        console.log(r);
      },
      error: (e) =>{
        console.log(e.error);
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

  convertirFecha(fecha:any) {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    //console.log(fecha);
    const date = new Date(fecha);
    const numeroMes = date.getMonth();
    const numeroDia = date.getDate();

    if(! isNaN(numeroMes) && numeroMes >= 1  && numeroMes <= 12 ) {
      return numeroDia + " de " + meses[numeroMes] + " - " + date.getHours() + ":" + String(date.getMinutes()).padStart(2, '0') + " hrs";
    }
    return null;
  }
}
