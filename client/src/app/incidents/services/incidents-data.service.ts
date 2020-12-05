import {Injectable} from '@angular/core';
import {DataService} from '@shared/data/data.service';
import {environment} from '@env/environment';
import {RestTypesEnum} from '@shared/enums/rest-types.enum';
import {IIncidentHttpResponse, IIncidentsHttpResponse} from '../interfaces/incidents-http-response.interface';
import {IIncident} from '@app/incidents/interfaces/incident.interface';

@Injectable()
export class IncidentsDataService {
  private baseUrl = environment.baseUrl;
  private path    = environment.IncidentsPath;

  constructor(private readonly dataService: DataService) {}

  async getIncidents(): Promise<IIncidentsHttpResponse> {
    const url    = this.baseUrl + this.path;
    const method = RestTypesEnum.GET;
    try {
      return await this.dataService.api<undefined, IIncidentsHttpResponse>(url, method);
    } catch (e) {
      return await e;
    }
  }

  async getIncident(incidentId: string): Promise<IIncidentHttpResponse> {
    const url    = `${this.baseUrl}${this.path}/${incidentId}`;
    const method = RestTypesEnum.GET;
    try {
      return await this.dataService.api<undefined, IIncidentHttpResponse>(url, method);
    } catch (e) {
      return await e;
    }
  }

  async updateIncident(incidentId: string, payload: IIncident): Promise<IIncidentHttpResponse> {
    const url    = `${this.baseUrl}${this.path}/${incidentId}`;
    const method = RestTypesEnum.PUT;
    try {
      return await this.dataService.api<IIncident, IIncidentHttpResponse>(url, method, payload);
    } catch (e) {
      return await e;
    }
  }

  async createIncident(): Promise<IIncidentsHttpResponse> {
    const url    = this.baseUrl + this.path;
    const method = RestTypesEnum.POST;
    try {
      return await this.dataService.api<undefined, IIncidentsHttpResponse>(url, method);
    } catch (e) {
      return await e;
    }
  }

}
