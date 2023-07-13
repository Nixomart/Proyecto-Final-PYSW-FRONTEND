import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarRutinasComponent } from './generar-rutinas.component';

describe('GenerarRutinasComponent', () => {
  let component: GenerarRutinasComponent;
  let fixture: ComponentFixture<GenerarRutinasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerarRutinasComponent]
    });
    fixture = TestBed.createComponent(GenerarRutinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
