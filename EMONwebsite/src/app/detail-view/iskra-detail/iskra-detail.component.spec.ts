import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IskraDetailComponent } from './iskra-detail.component';

describe('IskraDetailComponent', () => {
  let component: IskraDetailComponent;
  let fixture: ComponentFixture<IskraDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IskraDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IskraDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
