import { Routes } from '@angular/router';
export const routes: Routes = [
    {
        path: '',
    data: {
      title: 'Base'
    },
      children: [
        {
          path: '',
          redirectTo: 'cards',
          pathMatch: 'full'
        },
        //rutas de actividades componente creado 
        {
          path: 'actividad',
          loadComponent: () => import('./actividad/actividad.component').then(m => m.ActividadComponent),
          data: {
            title: 'Actividad'
          }
        },
        //rutas de reportes componente creado
        {
          path: 'reportes',
          loadComponent: () => import('./reportes/reportes.component').then(m => m.ReportesComponent),
          data: {
            title: 'Reportes'
          }
        },
    ]
    }
]