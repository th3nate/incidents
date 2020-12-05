import {NgModule} from '@angular/core';

import {IncidentsRoutingModule} from './incidents-routing.module';
import {IncidentsComponent} from './incidents.component';
import {SharedModule} from '../@shared/shared.module';
import {IncidentsService} from './incidents.service';
import {IncidentsWsService} from './incidents-ws.service';
import {RouterModule} from '@angular/router';
import {IncidentsDataService} from '@app/incidents/services/incidents-data.service';
import { IncidentModule } from '../incident/incident.module';

@NgModule({
  declarations: [IncidentsComponent],
  imports     : [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: IncidentsComponent
    }]),
    SharedModule,
    IncidentsRoutingModule,
    IncidentModule
  ],
  providers   : [IncidentsService, IncidentsDataService, IncidentsWsService]
})
export class IncidentsModule {
}
