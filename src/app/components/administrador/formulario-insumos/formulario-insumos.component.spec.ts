import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioInsumosComponent } from './formulario-insumos.component';

describe('FormularioInsumosComponent', () => {
  let component: FormularioInsumosComponent;
  let fixture: ComponentFixture<FormularioInsumosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioInsumosComponent]
    });
    fixture = TestBed.createComponent(FormularioInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
