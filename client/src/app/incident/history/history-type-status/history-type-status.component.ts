import {Component, Input} from '@angular/core';

@Component({
  templateUrl: './history-type-status.component.html',
  styleUrls: ['./history-type-status.component.scss']
})
export class HistoryTypeStatusComponent {
  @Input() propFrom  = 'Default propFrom';
  @Input() propTo = 'Default propTo';
  @Input() updatedAt = 'Default updatedAt';
}
