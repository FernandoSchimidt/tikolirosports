import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosNew } from './produtos-new';

describe('ProdutosNew', () => {
  let component: ProdutosNew;
  let fixture: ComponentFixture<ProdutosNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutosNew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
