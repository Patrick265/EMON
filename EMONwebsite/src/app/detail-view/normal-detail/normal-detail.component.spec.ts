import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalDetailComponent } from './normal-detail.component';

describe('NormalDetailComponent', () => {
  let component: NormalDetailComponent;
  let fixture: ComponentFixture<NormalDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
