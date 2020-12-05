import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTypePriorityComponent } from './history-type-priority.component';

describe('HistoryTypePriorityComponent', () => {
  let component: HistoryTypePriorityComponent;
  let fixture: ComponentFixture<HistoryTypePriorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryTypePriorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTypePriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
