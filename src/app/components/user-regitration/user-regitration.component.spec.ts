import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegitrationComponent } from './user-regitration.component';

describe('UserRegitrationComponent', () => {
  let component: UserRegitrationComponent;
  let fixture: ComponentFixture<UserRegitrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegitrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegitrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
