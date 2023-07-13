import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariopagosssComponent } from './formulariopagosss.component';

describe('FormulariopagosssComponent', () => {
  let component: FormulariopagosssComponent;
  let fixture: ComponentFixture<FormulariopagosssComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormulariopagosssComponent]
    });
    fixture = TestBed.createComponent(FormulariopagosssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
