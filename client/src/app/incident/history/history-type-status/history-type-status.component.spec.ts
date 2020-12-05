import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTypeStatusComponent } from './history-type-status.component';

describe('HistoryTypeStatusComponent', () => {
  let component: HistoryTypeStatusComponent;
  let fixture: ComponentFixture<HistoryTypeStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryTypeStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTypeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
