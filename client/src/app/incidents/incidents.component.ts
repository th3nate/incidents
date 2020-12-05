import {Component, OnDestroy, OnInit} from '@angular/core';
import {IIncident} from './interfaces/incident.interface';
import {IncidentsService} from './incidents.service';
import {IncidentsDataService} from '@app/incidents/services/incidents-data.service';
import {HttpStatusCode} from '@shared/enums/http-status.enum';

const EVENT_NAME = 'incidents-updated';

@Component({
  selector   : 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls  : ['./incidents.component.scss']
})
export class IncidentsComponent implements OnInit, OnDestroy {

  public currentIncidents = [] as IIncident[];

  constructor(private readonly incidentsService: IncidentsService, private readonly incidentsDataService: IncidentsDataService) {
  }

  async ngOnInit(): Promise<void> {
    this.listenToWs();
    const {incidents, status} = await this.incidentsDataService.getIncidents();
    if (status === HttpStatusCode.OK) {
      this.incidentsService.currentIncidents = incidents;
      this.currentIncidents = incidents;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeFromWs();
  }

  private listenToWs(): void {
    this.incidentsService
        .listen(EVENT_NAME)
        .subscribe((incident: IIncident) => {
          this.currentIncidents.push(incident);
          console.log('incident: ', incident);
        });
  }

  private unsubscribeFromWs(): void {
    this.incidentsService.unsubscribe(EVENT_NAME);
  }

  public trackByFn(index: number, item: IIncident): Date {
    return item.updatedAt;
  }

}
