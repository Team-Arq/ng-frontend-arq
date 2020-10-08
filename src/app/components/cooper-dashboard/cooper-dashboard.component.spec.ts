import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperDashboardComponent } from './cooper-dashboard.component';

describe('CooperDashboardComponent', () => {
  let component: CooperDashboardComponent;
  let fixture: ComponentFixture<CooperDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CooperDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CooperDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
