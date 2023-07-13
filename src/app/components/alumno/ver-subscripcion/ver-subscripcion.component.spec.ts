import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSubscripcionComponent } from './ver-subscripcion.component';

describe('VerSubscripcionComponent', () => {
  let component: VerSubscripcionComponent;
  let fixture: ComponentFixture<VerSubscripcionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerSubscripcionComponent]
    });
    fixture = TestBed.createComponent(VerSubscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
