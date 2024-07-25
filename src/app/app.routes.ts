import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch:'full',
    redirectTo: 'confirmar-invitacion'
  },
  {
    path: 'confirmar-invitacion',
    loadComponent: () => import('./pages/confirmacion-invitacion/confirmacion-invitacion.page').then( m => m.ConfirmacionInvitacionPage)
  },
];
