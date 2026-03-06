import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasNew } from './categorias-new';

describe('CategoriasNew', () => {
  let component: CategoriasNew;
  let fixture: ComponentFixture<CategoriasNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriasNew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriasNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
