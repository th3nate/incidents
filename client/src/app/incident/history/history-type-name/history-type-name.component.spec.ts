import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTypeNameComponent } from './history-type-name.component';

describe('HistoryTypeNameComponent', () => {
  let component: HistoryTypeNameComponent;
  let fixture: ComponentFixture<HistoryTypeNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryTypeNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTypeNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
