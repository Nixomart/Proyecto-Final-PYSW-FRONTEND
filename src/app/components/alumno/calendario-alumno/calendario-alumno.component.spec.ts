import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioAlumnoComponent } from './calendario-alumno.component';

describe('CalendarioAlumnoComponent', () => {
  let component: CalendarioAlumnoComponent;
  let fixture: ComponentFixture<CalendarioAlumnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarioAlumnoComponent]
    });
    fixture = TestBed.createComponent(CalendarioAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
