import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosDetalhe } from './pedidos.detalhe';

describe('PedidosDetalhe', () => {
  let component: PedidosDetalhe;
  let fixture: ComponentFixture<PedidosDetalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosDetalhe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosDetalhe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
