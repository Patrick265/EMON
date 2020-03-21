import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalEnergyDataComponent } from './normal-energy-data.component';

describe('NormalEnergyDataComponent', () => {
  let component: NormalEnergyDataComponent;
  let fixture: ComponentFixture<NormalEnergyDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalEnergyDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalEnergyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
