import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyDataComponent } from './energy-data.component';

describe('EnergyDataComponent', () => {
  let component: EnergyDataComponent;
  let fixture: ComponentFixture<EnergyDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergyDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
