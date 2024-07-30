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
  {
    path: 'reporte',
    loadComponent: () => import('./pages/reportes/reporte/reporte.page').then( m => m.ReportePage)
  },
  {
    path: 'total-invitaciones-enviadas',
    loadComponent: () => import('./pages/reportes/total-invitaciones-enviadas/total-invitaciones-enviadas.page').then( m => m.TotalInvitacionesEnviadasPage)
  }


];
