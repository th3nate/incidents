import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentComponent } from './incident.component';

const routes: Routes = [{ path: ':id', component: IncidentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentRoutingModule { }
