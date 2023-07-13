import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanarutinasComponent } from './semanarutinas.component';

describe('SemanarutinasComponent', () => {
  let component: SemanarutinasComponent;
  let fixture: ComponentFixture<SemanarutinasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SemanarutinasComponent]
    });
    fixture = TestBed.createComponent(SemanarutinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
