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

  ngOnInit() {}

}
