import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-aceptacion-invitacion',
  templateUrl: './aceptacion-invitacion.page.html',
  styleUrls: ['./aceptacion-invitacion.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AceptacionInvitacionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
