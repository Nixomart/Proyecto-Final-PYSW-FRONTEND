import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbargeneralComponent } from './navbargeneral.component';

describe('NavbargeneralComponent', () => {
  let component: NavbargeneralComponent;
  let fixture: ComponentFixture<NavbargeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbargeneralComponent]
    });
    fixture = TestBed.createComponent(NavbargeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
