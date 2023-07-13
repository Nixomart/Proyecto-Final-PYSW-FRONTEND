import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPagosComponent } from './formulario-pagos.component';

describe('FormularioPagosComponent', () => {
  let component: FormularioPagosComponent;
  let fixture: ComponentFixture<FormularioPagosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioPagosComponent]
    });
    fixture = TestBed.createComponent(FormularioPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
