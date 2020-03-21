import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureDataComponent } from './temperature-data.component';

describe('TemperatureDataComponent', () => {
  let component: TemperatureDataComponent;
  let fixture: ComponentFixture<TemperatureDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperatureDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
