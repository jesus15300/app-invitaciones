import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-no-valida',
  templateUrl: './pagina-no-valida.component.html',
  styleUrls: ['./pagina-no-valida.component.scss'],
  standalone:true,
  imports:[CommonModule]
})
export class PaginaNoValidaComponent  implements OnInit {
  @Input()
  error:any= null;
  @Input()
  mensajeError:string = "";
  constructor() { }

  ngOnInit() {
    console.log("%c2024 Club Alpha. Desarrollado por Ing. Jesus E. Salgado L.",
    "background-color: blue; color: #ffffff ; font-weight: bold ; padding: 4px ; font-size: 20px;");
  }

}
