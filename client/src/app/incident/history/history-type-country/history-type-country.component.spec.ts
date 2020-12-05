import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTypeCountryComponent } from './history-type-country.component';

describe('HistoryTypeCountryComponent', () => {
  let component: HistoryTypeCountryComponent;
  let fixture: ComponentFixture<HistoryTypeCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryTypeCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTypeCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
