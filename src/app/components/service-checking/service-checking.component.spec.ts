import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCheckingComponent } from './service-checking.component';

describe('ServiceCheckingComponent', () => {
  let component: ServiceCheckingComponent;
  let fixture: ComponentFixture<ServiceCheckingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCheckingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCheckingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
