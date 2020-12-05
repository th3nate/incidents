import {Component, Input} from '@angular/core';

@Component({
  templateUrl: './history-type-name.component.html',
  styleUrls  : ['./history-type-name.component.scss']
})
export class HistoryTypeNameComponent {
  @Input() propFrom  = 'Default propFrom';
  @Input() propTo = 'Default propTo';
  @Input() updatedAt = 'Default updatedAt';
}
