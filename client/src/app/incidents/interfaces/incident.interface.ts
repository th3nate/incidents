export interface IIncident {
  readonly id: string;
  readonly incidentId: string;
  readonly name: string;
  readonly status: string;
  readonly priority: string;
  readonly country: string;
  readonly history: any[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
