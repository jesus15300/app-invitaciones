import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'aceptacion-invitacion',
    loadComponent: () => import('./pages/aceptacion-invitacion/aceptacion-invitacion.page').then( m => m.AceptacionInvitacionPage)
  },
  {
    path: 'confirmar-invitacion',
    loadComponent: () => import('./pages/confirmacion-invitacion/confirmacion-invitacion.page').then( m => m.ConfirmacionInvitacionPage)
  },
];
