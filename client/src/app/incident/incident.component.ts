import {AfterViewInit, ChangeDetectionStrategy, Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IncidentsDataService} from '@app/incidents/services/incidents-data.service';
import {IIncident} from '@app/incidents/interfaces/incident.interface';
import {IncidentsService} from '@app/incidents/incidents.service';
import {DynamicComponentsTypes} from '@app/incident/enums/dynamic-components-types';
import {find} from 'lodash';
import * as moment from 'moment';

const EVENT_NAME = 'incidents-updated';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector       : 'app-incident',
  templateUrl    : './incident.component.html',
  styleUrls      : ['./incident.component.scss']
})
export class IncidentComponent implements OnInit, AfterViewInit, OnDestroy {

  public incidentsForm: FormGroup;
  public componentRef: ComponentRef<any>;
  public incident                         = {} as IIncident;
  private loadedComponentsNames: string[] = [];

  constructor(private readonly incidentsService: IncidentsService,
              private readonly incidentsDataService: IncidentsDataService,
              private actRoute: ActivatedRoute,
              private vcr: ViewContainerRef,
              private cfr: ComponentFactoryResolver) {
  }

  async ngAfterViewInit(): Promise<void> {
    await this.setUpViews();
  }

  async ngOnInit(): Promise<void> {
    this.listenToWs();
    this.incidentsForm = new FormGroup({
      name    : new FormControl(this.incident.name || null, Validators.required),
      status  : new FormControl(this.incident.status || null, Validators.required),
      priority: new FormControl(this.incident.priority || null, Validators.required),
      country : new FormControl(this.incident.country || null, Validators.required),
    });
  }

  async getDynamicComponent(item: { key: string, value: string }, items: any[]): Promise<void> {
    const itemDate = find(items, {key: 'updatedAt'}).value;
    if (this.loadedComponentsNames.indexOf(`${item.key}_${itemDate}`) === -1 && Object.keys(DynamicComponentsTypes).includes(item.key)) {

      const componentName = this.createDynamicComponentName(item.key);
      this.loadedComponentsNames.push(`${item.key}_${itemDate}`);

      const DynamicComponent: unknown       = await import(`./history/history-type-${item.key}/history-type-${item.key}.component`);
      const factory                         = this.cfr.resolveComponentFactory(DynamicComponent[componentName]);
      const componentRef: ComponentRef<any> = this.vcr.createComponent(factory);

      componentRef.instance.propFrom  = item.value;
      componentRef.instance.propTo    = this.incident[item.key];
      componentRef.instance.updatedAt = moment(find(items, {key: 'updatedAt'}).value).format('MMMM Do YYYY HH:mm:ss.SSSS');

    }
  }

  async setUpViews(): Promise<void> {
    const {incident} = await this.incidentsDataService.getIncident(this.actRoute?.snapshot?.params?.id);
    this.incident    = incident;
    this.incident.history?.reverse();
    this.initFormValues();
    await this.initHistoryItems();
  }

  createDynamicComponentName(componentType: string): string {
    return `HistoryType${componentType.charAt(0).toUpperCase() + componentType.slice(1)}Component`;
  }

  public async updateIncident(): Promise<void> {
    if (this.incidentsForm.valid && this.incidentsForm.dirty && !this.incidentsForm.pristine) {

      const payload = {
        name    : this.incidentsForm.controls.name.value,
        status  : this.incidentsForm.controls.status.value,
        priority: this.incidentsForm.controls.priority.value,
        country : this.incidentsForm.controls.country.value,
      } as IIncident;

      await this.incidentsDataService.updateIncident(this.incident.incidentId, payload);
    }
  }

  async initHistoryItems(): Promise<void> {
    for (const items of this.incident.history) {
      for (const item of items) {
        await this.getDynamicComponent(item, items);
      }
    }
  }

  initFormValues(): void {
    this.incidentsForm.controls.name.setValue(this.incident.name);
    this.incidentsForm.controls.status.setValue(this.incident.status);
    this.incidentsForm.controls.priority.setValue(this.incident.priority);
    this.incidentsForm.controls.country.setValue(this.incident.country);
  }

  private listenToWs(): void {
    this.incidentsService
        .listen(EVENT_NAME)
        .subscribe(async (incident: IIncident) => {
          this.incident = incident;
          this.incident.history?.reverse();
          await this.initHistoryItems();
          console.log('incident: ', incident);
        });
  }

  private unsubscribeFromWs(): void {
    this.incidentsService.unsubscribe(EVENT_NAME);
  }

  ngOnDestroy(): void {
    this.unsubscribeFromWs();
  }

}
