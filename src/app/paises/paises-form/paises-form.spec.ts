import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisesForm } from './paises-form';

describe('PaisesForm', () => {
  let component: PaisesForm;
  let fixture: ComponentFixture<PaisesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaisesForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaisesForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
