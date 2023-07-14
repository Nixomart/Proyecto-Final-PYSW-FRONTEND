import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jefe1Component } from './jefe1.component';

describe('Jefe1Component', () => {
  let component: Jefe1Component;
  let fixture: ComponentFixture<Jefe1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Jefe1Component]
    });
    fixture = TestBed.createComponent(Jefe1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
