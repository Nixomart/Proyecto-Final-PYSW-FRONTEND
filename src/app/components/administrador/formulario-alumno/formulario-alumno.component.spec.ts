import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAlumnoComponent } from './formulario-alumno.component';

describe('FormularioAlumnoComponent', () => {
  let component: FormularioAlumnoComponent;
  let fixture: ComponentFixture<FormularioAlumnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioAlumnoComponent]
    });
    fixture = TestBed.createComponent(FormularioAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
