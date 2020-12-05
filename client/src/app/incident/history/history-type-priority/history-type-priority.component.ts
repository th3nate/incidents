import {Component, Input} from '@angular/core';

@Component({
  templateUrl: './history-type-priority.component.html',
  styleUrls: ['./history-type-priority.component.scss']
})
export class HistoryTypePriorityComponent {
  @Input() propFrom  = 'Default propFrom';
  @Input() propTo = 'Default propTo';
  @Input() updatedAt = 'Default updatedAt';
}
