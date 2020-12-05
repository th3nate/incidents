import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IIncident} from './interfaces/incident.interface';
import {IncidentsWsService} from './incidents-ws.service';

@Injectable({providedIn: 'root'})
export class IncidentsService {
  private data = [] as IIncident[];

  constructor(private socket: IncidentsWsService) {
  }

  get currentIncidents(): IIncident[] {
    return this.data;
  }

  set currentIncidents(data: IIncident[]) {
    this.data = data;
  }

  listen(eventName: string): Observable<any> {
    return this.socket.fromEvent(eventName);
  }

  unsubscribe(eventName: string): any {
    return this.socket.removeAllListeners(eventName);
  }
}
