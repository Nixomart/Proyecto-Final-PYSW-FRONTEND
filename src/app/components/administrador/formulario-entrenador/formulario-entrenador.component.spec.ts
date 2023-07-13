import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEntrenadorComponent } from './formulario-entrenador.component';

describe('FormularioEntrenadorComponent', () => {
  let component: FormularioEntrenadorComponent;
  let fixture: ComponentFixture<FormularioEntrenadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioEntrenadorComponent]
    });
    fixture = TestBed.createComponent(FormularioEntrenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
