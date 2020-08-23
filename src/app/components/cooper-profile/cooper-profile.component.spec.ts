import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperProfileComponent } from './cooper-profile.component';

describe('CooperProfileComponent', () => {
  let component: CooperProfileComponent;
  let fixture: ComponentFixture<CooperProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CooperProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CooperProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
