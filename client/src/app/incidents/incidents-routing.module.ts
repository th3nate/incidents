import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from '../@shared/guards/auth-guard.service';

const routes: Routes = [
  {
    path        : 'incidents',
    loadChildren: () => import('./incidents.module').then(m => m.IncidentsModule),
    canActivate : [AuthGuardService]
  },
  {
    path        : 'incident',
    loadChildren: () => import('../incident/incident.module').then(m => m.IncidentModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentsRoutingModule {
}
