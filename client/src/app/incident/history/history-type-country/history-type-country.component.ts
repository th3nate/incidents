import {Component, Input} from '@angular/core';

@Component({
  templateUrl: './history-type-country.component.html',
  styleUrls: ['./history-type-country.component.scss']
})
export class HistoryTypeCountryComponent {
  @Input() propFrom  = 'Default propFrom';
  @Input() propTo = 'Default propTo';
  @Input() updatedAt = 'Default updatedAt';
}
