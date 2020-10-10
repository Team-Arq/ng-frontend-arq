import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceListAdminComponent } from './service-list-admin.component';

describe('ServiceListAdminComponent', () => {
  let component: ServiceListAdminComponent;
  let fixture: ComponentFixture<ServiceListAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceListAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
