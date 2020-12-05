import {IIncident} from './incident.interface';

export interface IIncidentsHttpResponse{
  incidents: IIncident[];
  status: number;
}

export interface IIncidentHttpResponse{
  incident: IIncident;
  status: number;
}
