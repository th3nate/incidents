import { NgModule } from '@angular/core';
import { IncidentComponent } from './incident.component';
import {SharedModule} from '@shared/shared.module';
import {IncidentRoutingModule} from '@app/incident/incident-routing.module';
import {IncidentsService} from '@app/incidents/incidents.service';
import {IncidentsDataService} from '@app/incidents/services/incidents-data.service';
import {IncidentsWsService} from '@app/incidents/incidents-ws.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [IncidentComponent],
  imports: [
    SharedModule,
    IncidentRoutingModule,
    FormsModule
  ],
  providers   : [IncidentsService, IncidentsDataService, IncidentsWsService]
})
export class IncidentModule { }
