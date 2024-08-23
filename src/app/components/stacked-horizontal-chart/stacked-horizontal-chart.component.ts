import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LegendPosition } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-stacked-horizontal-chart',
  templateUrl: './stacked-horizontal-chart.component.html',
  styleUrls: ['./stacked-horizontal-chart.component.scss'],
  standalone:true,
  imports:[CommonModule, NgxChartsModule]
})
export class StackedHorizontalChartComponent  implements OnInit {
  @Input()
  datos:any = undefined;
  multi: any[] = [];
  view: [number, number] = [350, 200];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Country';
  showYAxisLabel: boolean = false;
  xAxisLabel: string = 'Total de asistentes - ';
  
  legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };
  constructor() { }

  ngOnInit() {
    this.multi = [
      {
        "name": "",
        "series": [
          {
            "name": "Invitados",
            "value": this.datos[0]
          },
          {
            "name": "Acompañantes",
            "value": this.datos[1]
          }
        ]
      }
    ];
    this.xAxisLabel += (this.datos[0] + this.datos[1])
  }
  
  



  onSelect(event:any) {
    console.log(event);
  }
}
